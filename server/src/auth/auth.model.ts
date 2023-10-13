import * as argon2 from 'argon2';
import { Request, Response, NextFunction } from 'express';
import pool from '../db/db.js';
// Login
export const login = async (
  req: Request<object, object, { password: string; email: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { password, email } = req.body;
  const userSqlQuery =
    'SELECT * FROM user_account u LEFT JOIN profile p ON u.profile_id = p.profile_id WHERE u.email = $1';
  const user = await pool.query(userSqlQuery, [email]);
  
  if (user.rows.length == 0) return res.status(401).json('Usuário não encontrado.');

  await argon2
    .verify(user.rows[0].cipher, password, {
      parallelism: 2,
    })
    .then((match) => {
      if (match) {
        // remover senha da session
        delete user.rows[0].cipher;

        req.session.user = user.rows[0];

        return res.status(200).json(user.rows[0]);
      }
      res.status(401).json('As credenciais fornecidas estão incorretas.');
    })
    .catch((err) => {
      next(err);
    });
};
// Logout
export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.user) {
      req.session.destroy((err) => next(err));
      res.clearCookie('simpleforum_sessioncookie');
    }
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.user ? res.status(200).json(req.session.user) : res.status(200).json(null);
  } catch (err) {
    next(err);
  }
};
