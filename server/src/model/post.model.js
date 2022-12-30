import pool from '../config/db.js';
import { jsonMessage } from '../helpers/jsonResponse.js';
import { unlink } from 'fs';
// 157ec092-0b2e-4eeb-894a-c69d7af3053b
export const addReply = async (req, res, next) => {
  createPost(req, res, next, true);
};
export const addPost = async (req, res, next) => {
  createPost(req, res, next);
};
async function createPost(req, res, next) {
  try {
    const userId = req.session.user.profile_id;
    const subtopicId = req.params.subtopicId;
    const { message } = req.body;
    const files = req.files;
    const fileQuery = 'INSERT INTO file(post_id, reply_id, file_path) VALUES($1, $2, $3)';
    const postQuery =
      'INSERT INTO post(profile_id, subtopic_id, message) VALUES($1, $2, $3) RETURNING *';

    const post = await pool.query(postQuery, [userId, subtopicId, message]);

    Promise.all(
      files.map((file) => {
        pool.query(fileQuery, [post.rows[0].post_id, null, file.path]);
      }),
    )
      .then(res.status(200).json({ message: post.rows[0].message }))
      .catch(next);
  } catch (err) {
    next(err);
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user.user_id;
    const files = await pool.query('SELECT file_path FROM file WHERE post_id = $1', [postId]);

    if (typeof files == 'undefined' || files.rowCount === 0)
      return jsonMessage(res, 404, 'Post não encontrado');
    await pool
      .query('DELETE FROM post WHERE post_id = $1 AND profile_id = $2', [postId, userId])
      .then(() => {
        for (const file of files.rows) {
          unlink(`${file.file_path}`, (err) => {
            if (err) next;
          });
        }
        jsonMessage(res, 200, 'Post deletado com sucesso');
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
export const editPost = async (req, res, next) => {
  try {
    const { message, subtopic } = req.body;
    const postId = req.params.id;
    const userId = req.session.user.user_id;
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

export const listPostsBySubtopic = async (req, res, next) => {
  try {
    const id = req.params.id;
    //pega user_id e os posts associados
    let posts = await pool.query(
      'SELECT message, array_to_json(array_agg(file_path)) as files, title, created_at FROM post p LEFT JOIN file f ON p.post_id = f.post_id WHERE subtopic_id = $1 GROUP BY p.post_id',
      [id],
    );
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};
export const listPostsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId; //pega user_id e os posts associados
    const posts = await pool.query(
      'SELECT message, array_to_json(array_agg(file_path)), title, created_at as files, created_at FROM post p LEFT JOIN file f ON p.post_id = f.post_id WHERE p.profile_id = $1 GROUP BY p.post_id',
      [userId],
    );
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};

export const listPostReplies = async (req, res, next) => {
  try {
    const parentId = req.params.parentId;
    const posts = await pool.query('SELECT * FROM reply WHERE post_id = $1', [parentId]);
    res.status(200).json(posts.rows);
  } catch (err) {
    next(err);
  }
};


