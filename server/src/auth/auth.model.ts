import * as argon2 from 'argon2';
import { Request, Response, NextFunction } from 'express';
import pool from '../config/db/db.js';
// Login
export const signIn = async (
  req: Request<object, object, { password: string; email: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { password, email } = req.body;
  const user = await pool.query('SELECT * FROM profile WHERE email = $1', [email]);
  if (user.rowCount == 0) return res.status(401).json('Credenciais fornecidas estão incorretas');
  await argon2
    .verify(user.rows[0].cipher, password, {
      parallelism: 2,
    })
    .then((match) => {
      if (match) {
        delete user.rows[0].cipher;

        req.session.user = user.rows[0];

        return res.status(200).json(user.rows[0]);
      }
      console.log('INCORRETA')
      res.status(401).json('Credenciais fornecidas estão incorreta');
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
      res.clearCookie('myforum_sessioncookie');
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

