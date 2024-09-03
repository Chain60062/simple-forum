import pool, { getClient } from '../db/db.js';
import * as argon2 from 'argon2';
import { unlink } from 'node:fs';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { UserRequestObject } from './users.interfaces.js';
import logger from '../utils/logger.js';

const ADMIN_EMAIL = process.env.ADMIN_USER_EMAIL || 'admin@fakemail.xyz';
const ADMIN_PASSWORD = process.env.ADMIN_USER_PASSWORD || 'admin123';

const ADD_ADMIN_QUERY = `INSERT INTO user_account(user_name, user_role, email, cipher, email_is_verified) 
VALUES($1, $2, $3, $4, $5)`;
export const createAdminAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const adminUser = await pool.query('SELECT user_name FROM user_account WHERE user_name = $1', ['admin']);
    //checa se usuário existe
    if (adminUser.rows.length > 0)
      return res.status(400).json('Usuário admin já existe');

    const cipher = await argon2.hash(ADMIN_PASSWORD);

    pool.query(ADD_ADMIN_QUERY, ['admin', 'admin', ADMIN_EMAIL, cipher, true]);

    logger.info('Conta admin criado com sucesso.');

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const ADD_USER_QUERY = `INSERT INTO user_account(user_name, user_role, profile_id, email, cipher, email_is_verified) 
VALUES($1, $2, $3, $4, $5, $6)`;
const ADD_PROFILE_QUERY = 'INSERT INTO profile(profile_name, avatar) VALUES($1, $2) RETURNING profile_id'

export const createUser = async (
  req: Request<object, object, UserRequestObject>,
  res: Response,
  next: NextFunction,
) => {
  const client = await getClient()

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { user_name, profile_name, password, email } = req.body;
    const avatar = req.file;
    const cipher = await argon2.hash(password);

    await client.query('BEGIN');
    // profile creation
    const profile_id = await client.query(ADD_PROFILE_QUERY, [profile_name, avatar ? avatar.path : 'default.png']);
    await client.query(ADD_USER_QUERY, [user_name, 'user', profile_id.rows[0].profile_id, email, cipher, false]);

    await client.query('COMMIT');
    return res.status(200).json('Usuário criado com sucesso');
  } catch (err) {
    await client.query('ROLLBACK');
    next(err);
  } finally {
    client.release();
  }
};

const UPDATE_USER_QUERY = `UPDATE user_account 
SET user_name = $1, user_role = $2, email = $3, cipher = $4, email_is_verified = $5 
WHERE user_id = $6 RETURNING *`;

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  const client = await pool.connect();
  try {
    const profileId = req.session.user?.profile_id;
    const oldAvatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [
      profileId,
    ]);
    const avatar = req.file;
    const { user_name, password, profile_name, email } = req.body;

    if (typeof avatar === 'undefined')
      return res.status(400).json('Falha ao enviar imagem de usuário, tente novamente.');

    const cipher = await argon2.hash(password);

    await client.query('BEGIN');

    const userUpdate = await client.query(UPDATE_USER_QUERY, [
      user_name,
      'user',
      email,
      cipher,
      false,
    ]);

    const profileUpdateSqlQuery = 'UPDATE profile profile_name = $1, avatar = $2) RETURNING *';
    const profileUpdate = await client.query(profileUpdateSqlQuery, [
      profile_name,
      avatar ? avatar.path : 'default.png',
    ]);

    await client.query('COMMIT');

    unlink(oldAvatar.rows[0].avatar, (err) => {
      if (err) next(err);
    });

    const user = {
      ...userUpdate.rows[0],
      ...profileUpdate.rows[0],
    };
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  } finally {
    client.release();
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profileId = req.session.user?.profile_id;
    const avatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [profileId]);

    if (typeof avatar == 'undefined' || avatar.rowCount === 0)
      return res.status(400).json('Não foi possível apagar a conta');

    if (avatar.rows[0] != 'public/images/default.png') {
      unlink(avatar.rows[0].avatar, (err) => {
        if (err) next(err);
      });
    }
    await pool.query('DELETE FROM profile WHERE profile_id = $1', [profileId]);

    res.status(200).json('Sua conta foi removida com sucesso');
  } catch (err) {
    next(err);
  }
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  try {
    const user = await pool.query(`SELECT * FROM user_account u 
      LEFT JOIN profile p ON u.profile_id = p.profile_id 
      WHERE p.profile_name = $1`,
      [username]);

    if (user.rows.length === 0) return res.sendStatus(404);

    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await pool.query(
      'SELECT * FROM user_account u INNER JOIN profile p ON u.profile_id = p.profile_id WHERE u.email = $1',
      [email],
    );
    return user.rows[0];
  } catch (err) {
    return err;
  }
};
