import * as argon2 from 'argon2';
import type { Request, Response } from 'express';
import pool from '../db/db.js';
// Login
export const login = async (
	req: Request<object, object, { password: string; email: string }>,
	res: Response
) => {
	const { password, email } = req.body;
	const userSqlQuery =
		'SELECT * FROM user_account u LEFT JOIN profile p ON u.profile_id = p.profile_id WHERE u.email = $1';
	const user = await pool.query(userSqlQuery, [email]);

	if (user.rows.length === 0) {
		res.status(401).json('Usuário não encontrado.');
		return;
	}

	await argon2
		.verify(user.rows[0].cipher, password)
		.then((match) => {
			if (match) {
				// remover senha da session
				user.rows[0].cipher = undefined;

				req.session.user = user.rows[0];

				return res.status(200).json(user.rows[0]);
			}
			res.status(401).json('As credenciais fornecidas estão incorretas.');
		})
		.catch((err) => {
			throw err;
		});
};
// Logout
export const signOut = async (req: Request, res: Response) => {
	if (req.session.user) {
		req.session.destroy((err) => {
			throw err;
		});
		res.clearCookie('simpleforum_sessioncookie');
	}
	res.sendStatus(302);
};

export const isLoggedIn = async (req: Request, res: Response) => {
	req.session.user
		? res.status(200).json(req.session.user)
		: res.status(200).json(null);
};
