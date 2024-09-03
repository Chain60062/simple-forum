import pool, { getClient } from '../db/db.js';
import { unlink } from 'node:fs/promises';
import { Request, Response, NextFunction } from 'express';
import logger from 'src/utils/logger.js';
import { QueryResult } from 'pg';

//constantes
const ADD_REPLY_QUERY = `WITH inserted AS (INSERT INTO reply(user_id, post_id, parent_id, message) 
VALUES($1, $2, $3, $4) RETURNING *)
SELECT * FROM inserted i 
JOIN user_account ua ON i.user_id = ua.user_id 
JOIN profile p ON ua.profile_id = p.profile_id`;

const GET_REPLIES_QUERY = `SELECT * FROM reply r 
JOIN user_account ua ON r.user_id = ua.user_id 
JOIN profile p ON ua.profile_id = p.profile_id 
WHERE r.post_id = $1`

const UPDATE_REPLY_QUERY = 'UPDATE reply SET message = $1 WHERE reply_id =$2 and user_id = $3 RETURNING *'

export const addReply = async (
  req: Request<{ postId: string; parentId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.user?.user_id;
    const { message } = req.body;

    const reply = await pool.query(ADD_REPLY_QUERY, [userId, postId, null, message]);

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
  const client = await getClient()
  const replyId = req.params.replyId;
  const profileId = req.session.user?.profile_id;

  try {
    await client.query('BEGIN')
    if (typeof profileId === 'undefined')
      return res.status(401).json('Você não está autorizado a apagar este comentário')

    const files = await removeReplyFilesFromDatabase(replyId, profileId)

    if (files === null)
      return res.status(404).json('Post não encontrado')

    if (await removeReplyFilesFromDrive(files))
      return res.status(500).json('Erro interno ao apagar imagens, tente novamente mais tarde.')

    await client.query('COMMIT')

    res.status(200).json('Comentário apagado com sucesso')
  } catch (err) {
    next(err);
  } finally {
    client.release()
  }

  async function removeReplyFilesFromDrive(files: QueryResult<any>) {
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

  async function removeReplyFilesFromDatabase(replyId: string, profileId: string) {
    const files = await client.query('SELECT file_path FROM file WHERE reply_id = $1', [replyId])

    if (typeof files == 'undefined' || files.rowCount === 0)
      return null

    await pool.query('DELETE FROM reply WHERE reply_id = $1 AND profile_id = $2', [replyId, profileId])

    return files
  }
};

export const editReply = async (
  req: Request<{ replyId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const client = await getClient()
  const { message } = req.body;
  const replyId = req.params.replyId;
  const userId = req.session.user?.user_id;

  try {
    const post = await pool.query('SELECT * FROM reply WHERE reply_id = $1', [replyId]);

    if (post.rows[0].user_id != userId) {
      return res.status(401).json("Você não pode realizar esta ação.");
    }

    const updatedPost = await pool.query(UPDATE_REPLY_QUERY, [message, replyId, userId]);

    res.status(200).json(updatedPost.rows[0]);
  } catch (err) {
    next(err)
  } finally {
    client.release()
  }
};

export const getPostReplies = async (
  req: Request<{ postId: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const postId = req.params.postId;
    const replies = await pool.query(GET_REPLIES_QUERY, [postId]);
    res.status(200).json(replies.rows);
  } catch (err) {
    next(err);
  }
};
