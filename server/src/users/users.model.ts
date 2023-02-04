import pool from '../config/db/db.js';
import * as argon2 from 'argon2';
import { unlink } from 'node:fs';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
export const createUser = async (
  req: Request<
    object,
    object,
    { profile_name: string; password: string; nickname: string; email: string }
  >,
  res: Response,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { profile_name, password, nickname, email } = req.body;
    const avatar = req.file;
    const sqlQuery =
      'INSERT INTO profile(cipher, avatar, profile_name, profile_role, is_verified, nickname, email) VALUES($1, $2, $3, $4, $5, $6, $7)';

    const hash = await argon2.hash(password, {
      parallelism: 2,
    });
    await pool.query(sqlQuery, [
      hash,
      avatar ? avatar.path : 'default.png',
      profile_name,
      'user',
      false,
      nickname,
      email,
    ]);
    return res.status(200).json('Usuário criado com sucesso');
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.user?.user_id;
    const oldAvatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [
      userId,
    ]);
    const avatar = req.file;
    const { name, password, nickname, email } = req.body;

    if (typeof avatar === 'undefined')
      return res.status(400).json('Falha ao enviar imagem de usuário, tente novamente.');

    const sqlQuery =
      'UPDATE profile SET cipher = $1, avatar = $2, profile_name = $3, nickname = $4, email = $5 WHERE profile_id = $6 RETURNING avatar, profile_name, nickname, email';

    unlink(oldAvatar.rows[0].avatar, (err) => {
      if (err) next(err);
    });

    const hash = await argon2.hash(password, {
      parallelism: 2,
    });
    const user = await pool.query(sqlQuery, [hash, avatar.path, name, nickname, email, userId]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.session.user?.user_id;
    const avatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [userId]);

    if (typeof avatar == 'undefined' || avatar.rowCount === 0)
      return res.status(400).json('Não foi possível apagar a conta');

    if (avatar.rows[0] != 'src/public/default.png') {
      unlink(avatar.rows[0].avatar, (err) => {
        if (err) next(err);
      });
    }
    await pool.query('DELETE FROM profile WHERE profile_id = $1', [userId]);

    res.status(200).json('Sua conta foi removida com sucesso');
  } catch (err) {
    next(err);
  }
};

export const getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  try {
    const user = await pool.query('SELECT * FROM profile WHERE nickname = $1', [username]);
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
    return user.rows[0];
  } catch (err) {
    return err;
  }
};

