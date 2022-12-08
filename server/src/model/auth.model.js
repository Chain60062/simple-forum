import * as argon2 from 'argon2';
import pool from '../config/db.js';
import { jsonMessage } from '../helpers/jsonResponse.js';
// Login
export const signIn = async (req, res, next) => {
  const { password, email } = req.body;
  // encontrar usuario por email
  const user = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
  if (typeof user == 'undefined' || user.rowCount == 0)
    jsonMessage(res, 404, 'Usuário não encontrado');
  await argon2
    .verify(user.rows[0].cipher, password, {
      parallelism: 2, //2 threads
    })
    .then(() => {
      // remover senha por segurança
      delete user.rows[0].cipher;
      // inserir usuario sem a senha na sessao
      req.session.user = user.rows[0];
      jsonMessage(res, 200, 'Usuário entrou com sucesso');
    })
    .catch(next);
};
// Logout
export const signOut = async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('myforum_sessioncookie');
  }
  res.sendStatus(200);
};

