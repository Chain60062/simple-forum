import { unlink } from 'node:fs';
import * as argon2 from 'argon2';
import type { Request, Response } from 'express';
import pool, { getClient } from '../db/db.js';
import logger from '../utils/logger.js';
import ajv from '../utils/validation.js';
import type { RegisterUser } from './users.interfaces.js';

//admin@fakemail.xyz
const ADMIN_EMAIL = process.env.ADMIN_USER_EMAIL ?? 'admin@simpleforum.com';
const ADMIN_PASSWORD = process.env.ADMIN_USER_PASSWORD ?? 'admin123';

const ADD_ADMIN_QUERY = `INSERT INTO user_account(user_name, user_role, email, cipher, email_is_verified)
VALUES($1, $2, $3, $4, $5)`;
export const createAdminAccount = async (req: Request, res: Response) => {
	const adminUser = await pool.query(
		'SELECT user_name FROM user_account WHERE user_name = $1',
		['admin']
	);
	//checa se usuário existe
	if (adminUser.rows.length > 0) {
		res.status(400).json('Usuário admin já existe');
		return;
	}
	const cipher = await argon2.hash(ADMIN_PASSWORD);

	pool.query(ADD_ADMIN_QUERY, ['admin', 'admin', ADMIN_EMAIL, cipher, true]);

	logger.info('Conta admin criado com sucesso.');

	res.sendStatus(201);
};

const ADD_USER_QUERY = `INSERT INTO user_account(user_name, user_role, profile_id, email, cipher, email_is_verified)
VALUES($1, $2, $3, $4, $5, $6)`;
const ADD_PROFILE_QUERY =
	'INSERT INTO profile(profile_name, avatar) VALUES($1, $2) RETURNING profile_id';

export const createUser = async (req: Request, res: Response) => {
	const client = await getClient();

	try {
		const validate = ajv.getSchema<RegisterUser>('register');
		if (typeof validate !== 'undefined') {
			if (validate(req.body)) {
				const { user_name, profile_name, password, email } = req.body;
				logger.info(`${user_name} ${profile_name} ${password} ${email}`);
				const avatar = req.file;
				const cipher = await argon2.hash(password);

				await client.query('BEGIN');
				// profile creation
				const profile_id = await client.query(ADD_PROFILE_QUERY, [
					profile_name,
					avatar ? avatar.path : 'default.png',
				]);
				await client.query(ADD_USER_QUERY, [
					user_name,
					'user',
					profile_id.rows[0].profile_id,
					email,
					cipher,
					false,
				]);

				await client.query('COMMIT');
			} else {
				res.status(400).json('Erro inesperado ao obter corpo da requisição');
				return;
			}
		} else {
			res.status(500).json('Erro inesperado ao obter corpo da requisição');
			return;
		}

		res.status(201).json('Usuário criado com sucesso');
	} catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
};

const UPDATE_USER_QUERY = `UPDATE user_account
SET user_name = $1, user_role = $2, email = $3, cipher = $4, email_is_verified = $5
WHERE user_id = $6 RETURNING *`;

export const editUser = async (req: Request, res: Response) => {
	const client = await pool.connect();
	try {
		const profileId = req.session.user?.profile_id;
		const oldAvatar = await pool.query(
			'SELECT avatar FROM profile WHERE profile_id = $1',
			[profileId]
		);
		const avatar = req.file;
		const { user_name, password, profile_name, email } = req.body;

		if (typeof avatar === 'undefined') {
			res
				.status(400)
				.json('Falha ao enviar imagem de usuário, tente novamente.');
			return;
		}
		const cipher = await argon2.hash(password);

		await client.query('BEGIN');

		const userUpdate = await client.query(UPDATE_USER_QUERY, [
			user_name,
			'user',
			email,
			cipher,
			false,
		]);

		const profileUpdateSqlQuery =
			'UPDATE profile profile_name = $1, avatar = $2) RETURNING *';
		const profileUpdate = await client.query(profileUpdateSqlQuery, [
			profile_name,
			avatar ? avatar.path : 'default.png',
		]);

		await client.query('COMMIT');

		unlink(oldAvatar.rows[0].avatar, (err) => {
			if (err) throw err;
		});

		const user = {
			...userUpdate.rows[0],
			...profileUpdate.rows[0],
		};
		res.status(200).json(user.rows[0]);
	} finally {
		client.release();
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const profileId = req.session.user?.profile_id;
	const avatar = await pool.query(
		'SELECT avatar FROM profile WHERE profile_id = $1',
		[profileId]
	);

	if (typeof avatar === 'undefined' || avatar.rowCount === 0) {
		res.status(400).json('Não foi possível apagar a conta');
		return;
	}

	if (avatar.rows[0] !== 'public/images/default.png') {
		unlink(avatar.rows[0].avatar, (err) => {
			if (err) throw err;
		});
	}
	await pool.query('DELETE FROM profile WHERE profile_id = $1', [profileId]);

	res.status(200).json('Sua conta foi removida com sucesso');
};

export const getUserByUsername = async (req: Request, res: Response) => {
	const username = req.params.username;

	const user = await pool.query(
		`SELECT * FROM user_account u
      LEFT JOIN profile p ON u.profile_id = p.profile_id
      WHERE p.profile_name = $1`,
		[username]
	);

	if (user.rows.length === 0) {
		res.sendStatus(404);
		return;
	}

	res.status(200).json(user.rows[0]);
};

async function getUserByEmail(email: string) {
	const user = await pool.query(
		'SELECT * FROM user_account u INNER JOIN profile p ON u.profile_id = p.profile_id WHERE u.email = $1',
		[email]
	);

	return user.rows[0];
}
