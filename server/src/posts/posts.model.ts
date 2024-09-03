import { NextFunction, Response, Request } from 'express';
import pool, { getClient } from '../db/db.js';
import { ICreatePost } from './posts.interfaces.js';
import { unlink } from 'node:fs/promises';
import path from 'path';
import logger from 'src/utils/logger.js';
import { QueryResult } from 'pg';

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
  const client = await pool.connect();
  try {
    const userId = req.session.user?.user_id;
    const subtopicId = req.params.subtopicId;
    const { message, title } = req.body;
    const files = req.files as Express.Multer.File[];
    const fileQuery = 'INSERT INTO file(post_id, reply_id, file_path, alt) VALUES($1, $2, $3, $4)';
    // Transaction
    await client.query('BEGIN');
    const postQuery =
      'INSERT INTO post(user_id, subtopic_id, title, message) VALUES($1, $2, $3, $4) RETURNING *';

    const post = await client.query(postQuery, [userId, subtopicId, title, message]);

    if (typeof files != 'undefined') {
      Promise.all(
        files.map((file: Express.Multer.File) => {
          const filePath = path.join('uploads', file.filename);
          client.query(fileQuery, [post.rows[0].post_id, null, filePath, file.filename.slice(0, 16)]);
        }),
      ).catch(next);
    }

    await client.query('COMMIT');

    res.status(200).json(post.rows[0]);
  } catch (err) {
    next(err);
  } finally {
    client.release();
  }
}

export const deletePost = async (
  req: Request<{ postId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const postId = req.params.postId
  const userId = req.session.user?.user_id
  const client = await getClient()
  try {
    await client.query('BEGIN')
    if (typeof userId === 'undefined')
      return res.status(401).json('Você não está autorizado a apagar este post')

    const files = await removePostFilesFromDatabase(postId, userId)

    if (files === null)
      return res.status(404).json('Post não encontrado')

    if (await removePostFilesFromDrive(files))
      return res.status(500).json('Erro interno ao apagar imagens, tente novamente mais tarde.')

    await client.query('COMMIT')

    res.status(200).json('Post apagado com sucesso')
  } catch (err) {
    logger.error(`Erro ao apagar imagens de um post.`)
    await client.query('ROLLBACK')
    next(err)
  } finally {
    client.release()
  }

  async function removePostFilesFromDrive(files: QueryResult<any>) {
    const fileRemovalPromises = []

    for (const file of files.rows) {
      fileRemovalPromises.push(unlink(`${file.file_path}`).catch(() => {
        logger.error(`Erro ao apagar imagem ${file.file_path}`)
        return false
      }))
    }

    await Promise.all(fileRemovalPromises)
    return true
  }

  async function removePostFilesFromDatabase(postId: string, userId: string) {
    const files = await client.query('SELECT file_path FROM file WHERE post_id = $1', [postId])
    if (typeof files == 'undefined' || files.rowCount === 0)
      return null

    await pool.query('DELETE FROM post WHERE post_id = $1 AND user_id = $2', [postId, userId])

    return files
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
    const userId = req.session.user?.profile_id;
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
      left join file f on p.post_id = f.post_id
      join user_account u on p.user_id = u.user_id 
      join profile pf on u.profile_id = pf.profile_id
      where
        subtopic_id = $1
      group by
        p.post_id,
        pf.profile_name
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
    const userId = req.params.userId; //pega profile_id e os posts associados
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

