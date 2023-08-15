import pool from '../config/db/db.js';
import { unlink } from 'fs';
import { Request, Response, NextFunction } from 'express';

export const addReply = async (
  req: Request<{ postId: string; parentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const parentId = req.params.parentId;
    const userId = req.session.user?.profile_id;
    const { message } = req.body;
    // const files = req.files as Express.Multer.File[];
    // const fileQuery = 'INSERT INTO file(reply_id, file_path) VALUES($1, $2)';
    const replyQuery =
      `WITH inserted AS (INSERT INTO reply(profile_id, post_id, parent_id, message) VALUES($1, $2, $3, $4) RETURNING *) SELECT * FROM 
      inserted AS i JOIN profile AS p ON i.profile_id = p.profile_id`;

    const reply = await pool.query(replyQuery, [userId, postId, parentId, message]);

    res.status(200).json(reply.rows[0]);
    // Promise.all(
    //   files.map((file: Express.Multer.File) => {
    //     pool.query(fileQuery, [reply.rows[0].reply_id, file.path]);
    //   }),
    // )
    //   .then(() => {
    //     res.status(200).json({ message: reply.rows[0].message });
    //   })
    //   .catch((err) => next(err));
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
    const { message, subtopic } = req.body;
    const replyId = req.params.replyId;
    const userId = req.session.user?.profile_id;
    const subtopicId = await pool.query(
      'SELECT subtopic_id FROM subtopic WHERE subtopic_name = $1',
      [subtopic],
    );
    // const files = await pool.query('SELECT file_path FROM file WHERE post_id = $1', [postId]);
    const sqlQuery =
      'UPDATE post SET message = $1, subtopic_id = $2 WHERE post_id = $3 and profile_id = $4';
    const post = await pool.query(sqlQuery, [message, subtopicId, replyId, userId]);

    res.status(200).json(post.rows[0]);
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
      `with recursive replies as (select r.reply_id, r.message, r.parent_id, r.post_id, r.created_at, p.nickname, p.profile_name, p.avatar from reply r join profile p on p.profile_id = r.profile_id 
      where r.post_id = $1 union select child.reply_id, child.message, child.parent_id, child.post_id, child.created_at, p.nickname, p.profile_name, p.avatar from reply child
      join replies on child.parent_id = replies.reply_id join profile p on p.profile_id = child.profile_id) select * from replies r order by r.created_at desc`,
      [postId],
    );
    res.status(200).json(replies.rows);
  } catch (err) {
    next(err);
  }
};

