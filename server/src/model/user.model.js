import pool from '../config/db.js';
import * as argon2 from 'argon2';
import { jsonMessage } from '../helpers/jsonResponse.js';
import { unlink } from 'node:fs';
export const createUser = async (req, res, next) => {
  try {
    const { name, password, nickname, email } = req.body;
    const avatar = req.file;
    const sqlQuery =
      'INSERT INTO profile(cipher, avatar, profile_name, profile_role, is_verified, nickname, email) VALUES($1, $2, $3, $4, $5, $6, $7)';

    // hashing
    const hash = await argon2.hash(password, {
      parallelism: 2,
    });
    await pool.query(sqlQuery, [
      hash,
      avatar ? avatar.path : null,
      name,
      'user',
      false,
      nickname,
      email,
    ]);
    jsonMessage(res, 200, 'Usuário criado com sucesso');
  } catch (err) {
    next(err);
  }
};

export const editUser = async (req, res, next) => {
  try {
    const userId = req.session.user.user_id;
    const oldAvatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [
      userId,
    ]);
    const avatar = req.file;
    const { name, password, nickname, email } = req.body;
    const sqlQuery =
      'UPDATE profile SET cipher = $1, avatar = $2, profile_name = $3, nickname = $4, email = $5 WHERE profile_id = $6 RETURNING avatar, profile_name, nickname, email';

    unlink(oldAvatar.rows[0].avatar, () => {});

    const hash = await argon2.hash(password, {
      parallelism: 2,
    });
    const user = await pool.query(sqlQuery, [hash, avatar.path, name, nickname, email, userId]);
    return res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.session.user.user_id;
    const avatar = await pool.query('SELECT avatar FROM profile WHERE profile_id = $1', [userId]);

    if (typeof avatar == 'undefined' || avatar.rowCount === 0)
      return jsonMessage(res, 400, 'Não foi possível apagar a conta');

    if (avatar.rows[0] != 'src/public/default.png') {
      unlink(avatar.rows[0].avatar, (err) => {
        if (err) next(err);
      });
    }
    await pool.query('DELETE FROM profile WHERE profile_id = $1', [userId]);

    return jsonMessage(res, 200, 'Sua conta foi apagada com sucesso');
  } catch (err) {
    next(err);
  }
};

