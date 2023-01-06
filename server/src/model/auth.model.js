import * as argon2 from 'argon2';
import pool from '../config/db.js';
import { jsonMessage } from '../helpers/jsonResponse.js';
// Login
export const signIn = async (req, res, next) => {
  const { password, email } = req.body;
  const user = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
  if (user.rowCount == 0) return jsonMessage(res, 401, 'Credenciais fornecidas estão incorretas');
  await argon2
    .verify(user.rows[0].cipher, password, {
      parallelism: 2,
    })
    .then((match) => {
      if (match) {
        // remover senha por segurança
        delete user.rows[0].cipher;

        req.session.user = user.rows[0];
        
        return jsonMessage(res, 200, 'Usuário entrou com sucesso');
      }
      return jsonMessage(res, 401, 'Credenciais fornecidas estão incorreta');
    })
    .catch((err) => {
      next(err);
    });
};
// Logout
export const signOut = async (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('myforum_sessioncookie');
  }
  res.sendStatus(200);
};

