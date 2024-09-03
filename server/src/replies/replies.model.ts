import pool from '../db/db.js';
import { unlink } from 'node:fs/promises';
import { Request, Response, NextFunction } from 'express';

export const addReply = async (
  req: Request<{ postId: string; parentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.user?.user_id;
    const { message } = req.body;
    const replyQuery = `WITH inserted AS (INSERT INTO reply(user_id, post_id, parent_id, message) 
    VALUES($1, $2, $3, $4) RETURNING *)
    SELECT * FROM inserted i 
    JOIN user_account ua ON i.user_id = ua.user_id 
    JOIN profile p ON ua.profile_id = p.profile_id`;

    const reply = await pool.query(replyQuery, [userId, postId, null, message]);

    res.status(200).json(reply.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const deleteReply = async (
  req: Request<{ replyId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const replyId = req.params.replyId;
    const userId = req.session.user?.profile_id;
    const files = await pool.query('SELECT file_path FROM file WHERE reply_id = $1', [replyId]);

    if (typeof files == 'undefined' || files.rowCount === 0)
      return res.status(404).json('Post não encontrado');
    await pool
      .query('DELETE FROM reply WHERE reply_id = $1 AND profile_id = $2', [replyId, userId])
      .then(() => {
        for (const file of files.rows) {
          unlink(`${file.file_path}`, (err) => {
            if (err) next;
          });
        }
        res.status(200).json('Comentário deletado com sucesso');
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
export const editReply = async (
  req: Request<{ replyId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message } = req.body;
    const replyId = req.params.replyId;
    const userId = req.session.user?.user_id;

    const selectQuery = 'SELECT * FROM reply WHERE reply_id = $1';
    const post = await pool.query(selectQuery, [replyId]);

    if (post.rows[0].user_id != userId) {
      return res.status(401).json("Você não pode realizar esta ação.");
    }

    const sqlQuery = 'UPDATE reply SET message = $1 WHERE reply_id =$2 and user_id = $3 RETURNING *';
    const updatedPost = await pool.query(sqlQuery, [message, replyId, userId]);

    res.status(200).json(updatedPost.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const getPostReplies = async (
  req: Request<{ postId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const replies = await pool.query(
      `SELECT * FROM reply r 
      JOIN user_account ua ON r.user_id = ua.user_id 
      JOIN profile p ON ua.profile_id = p.profile_id 
      WHERE r.post_id = $1`,
      [postId],
    );
    res.status(200).json(replies.rows);
  } catch (err) {
    next(err);
  }
};

