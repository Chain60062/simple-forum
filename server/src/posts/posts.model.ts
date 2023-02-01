import { NextFunction, Response, Request } from 'express';
import pool from '../config/db/db.js';
import { ICreatePost } from './posts.types';
import { unlink } from 'fs';

export const addReply = async (
  req: Request<{ subtopicId: string }, object, ICreatePost>,
  res: Response,
  next: NextFunction,
) => {
  createPost(req, res, next);
};
export const addPost = async (
  req: Request<{ subtopicId: string }, object, ICreatePost>,
  res: Response,
  next: NextFunction,
) => {
  createPost(req, res, next);
};
async function createPost(
  req: Request<{ subtopicId: string }, object, ICreatePost>,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.session.user?.profile_id;
    const subtopicId = req.params.subtopicId;
    const { message, title } = req.body;
    const files = req.files as Express.Multer.File[];
    const fileQuery = 'INSERT INTO file(post_id, reply_id, file_path) VALUES($1, $2, $3)';
    const postQuery =
      'INSERT INTO post(profile_id, subtopic_id, title, message) VALUES($1, $2, $3, $4) RETURNING *';

    const post = await pool.query(postQuery, [userId, subtopicId, title, message]);

    if (typeof files != 'undefined') {
      Promise.all(
        files.map((file: Express.Multer.File) => {
          pool.query(fileQuery, [post.rows[0].post_id, null, file.path]);
        }),
      ).catch(next);
    }
    res.status(200).json(post.rows[0]);
  } catch (err) {
    next(err);
  }
}

export const deletePost = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.user?.user_id;
    const files = await pool.query('SELECT file_path FROM file WHERE post_id = $1', [postId]);

    if (typeof files == 'undefined' || files.rowCount === 0)
      return res.status(404).json('Post não encontrado');
    await pool
      .query('DELETE FROM post WHERE post_id = $1 AND profile_id = $2', [postId, userId])
      .then(() => {
        for (const file of files.rows) {
          unlink(`${file.file_path}`, (err) => {
            if (err) next(err);
          });
        }
        res.status(200).json('Post deletado com sucesso');
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
export const editPost = async (
  req: Request<{ postId: string }, object, { message: string; subtopic: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { message, subtopic } = req.body;
    const postId = req.params.postId;
    const userId = req.session.user?.user_id;
    const subtopicId = await pool.query(
      'SELECT subtopic_id FROM subtopic WHERE subtopic_name = $1',
      [subtopic],
    );
    // const files = await pool.query('SELECT file_path FROM file WHERE post_id = $1', [postId]);
    const sqlQuery =
      'UPDATE post SET message = $1, subtopic_id = $2 WHERE post_id = $3 and profile_id = $4';

    const post = await pool.query(sqlQuery, [message, subtopicId, postId, userId]);

    res.status(200).json(post.rows[0]);
  } catch (err) {
    next(err);
  }
};

export const listPostsBySubtopic = async (
  req: Request<{ subtopicId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const subtopicId = req.params.subtopicId;

    const posts = await pool.query(
      `select
        p.post_id,
        profile_name,
        message,
        array_to_json(array_agg(file_path)) as files,
        title,
        p.created_at
      from
        post p
      left join file f on
        p.post_id = f.post_id
      join profile u on p.profile_id = u.profile_id 
      where
        subtopic_id = $1
      group by
        p.post_id,
        u.profile_name
      order by
      created_at desc`,
      [subtopicId],
    );
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};
export const listPostsByUser = async (
  req: Request<{ userId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.params.userId; //pega user_id e os posts associados
    const posts = await pool.query(
      'SELECT p.post_id, profile_id, message, array_to_json(array_agg(file_path)), title, created_at as files, created_at FROM post p LEFT JOIN file f ON p.post_id = f.post_id WHERE p.profile_id = $1 GROUP BY p.post_id ORDER BY created_at DESC',
      [userId],
    );
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};

export const listPostReplies = async (
  req: Request<{ parentId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parentId = req.params.parentId;
    const posts = await pool.query('SELECT * FROM reply WHERE post_id = $1', [parentId]);
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const post = await pool.query('SELECT * FROM post WHERE post_id = $1', [postId]);
    res.status(200).json(post.rows[0]);
  } catch (err) {
    next(err);
  }
};

