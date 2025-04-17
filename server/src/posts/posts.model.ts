import { unlink } from 'node:fs/promises';
import path from 'node:path';
import type { Request, Response } from 'express';
import type { QueryResult } from 'pg';
import pool, { getClient } from '../db/db.js';
import logger from '../utils/logger.js';
import ajv from '../utils/validation.js';
import type { Post } from './posts.interfaces.js';

export const addReply = async (
	req: Request<{ subtopicId: string }, object, Post>,
	res: Response
) => {
	createPost(req, res);
};
export const addPost = async (
	req: Request<{ subtopicId: string }, object, Post>,
	res: Response
) => {
	createPost(req, res);
};

const INSERT_POST_SQL =
	'INSERT INTO post(user_id, subtopic_id, title, message) VALUES($1, $2, $3, $4) RETURNING *';
const INSERT_POST_FILES_SQL =
	'INSERT INTO file(post_id, reply_id, file_path, alt) VALUES($1, $2, $3, $4)';

async function createPost(
	req: Request<{ subtopicId: string }, object, Post>,
	res: Response
) {
	const client = await pool.connect();
	try {
		const validate = ajv.getSchema<Post>('post');
		//checar undefined, se sim, retornar erro 500
		if (typeof validate !== 'undefined') {
			if (validate(req.body)) {
				const userId = req.session.user?.user_id;
				const subtopicId = req.params.subtopicId;
				const { message, title } = req.body;
				const files = req.files as Express.Multer.File[];

				await client.query('BEGIN');

				const post = await client.query(INSERT_POST_SQL, [
					userId,
					subtopicId,
					title,
					message,
				]);

				if (typeof files !== 'undefined') {
					Promise.all(
						files.map((file: Express.Multer.File) => {
							const filePath = path.join('uploads', file.filename);
							client.query(INSERT_POST_FILES_SQL, [
								post.rows[0].post_id,
								null,
								filePath,
								file.filename.slice(0, 16),
							]);
						})
					).catch((err) => {
						throw err;
					});
				}

				await client.query('COMMIT');

				res.status(200).json(post.rows[0]);
			} else return res.status(400).json('Formato da requisição inválido');
		} else
			return res
				.status(500)
				.json('Erro inesperado ao obter corpo da requisição');
	} finally {
		client.release();
	}
}

export const deletePost = async (
	req: Request<{ postId: string }>,
	res: Response
) => {
	const postId = req.params.postId;
	const userId = req.session.user?.user_id;
	const client = await getClient();
	try {
		await client.query('BEGIN');
		if (typeof userId === 'undefined') {
			res.status(401).json('Você não está autorizado a apagar este post');
			return;
		}
		const files = await client.query(
			'SELECT file_path FROM file WHERE post_id = $1',
			[postId]
		);

		if (await removePostFilesFromDatabase(postId, userId, files)) {
			res.status(500).json('Erro interno ao remover imagens do post');
			return;
		}

		if (files === null) {
			res.status(404).json('Post não encontrado');
			return;
		}

		if (await removePostFilesFromStorage(files)) {
			res
				.status(500)
				.json('Erro interno ao apagar imagens, tente novamente mais tarde.');
			return;
		}
		await client.query('COMMIT');

		res.status(200).json('Post apagado com sucesso');
	} catch (err) {
		logger.error('Erro ao apagar imagens de um post.');
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}

	async function removePostFilesFromStorage(files: QueryResult) {
		const fileRemovalPromises = [];

		for (const file of files.rows) {
			fileRemovalPromises.push(
				unlink(`${file.file_path}`).catch(() => {
					logger.error(`Erro ao apagar imagem ${file.file_path}`);
					return false;
				})
			);
		}

		await Promise.all(fileRemovalPromises);
		return true;
	}

	async function removePostFilesFromDatabase(
		postId: string,
		userId: string,
		files: QueryResult
	) {
		if (typeof files === 'undefined' || files.rowCount === 0) return false;

		await pool.query('DELETE FROM post WHERE post_id = $1 AND user_id = $2', [
			postId,
			userId,
		]);

		return true;
	}
};

const EDIT_POST_QUERY =
	'UPDATE post SET message = $1, subtopic_id = $2 WHERE post_id = $3 and profile_id = $4';
export const editPost = async (
	req: Request<
		{ postId: string },
		object,
		{ message: string; subtopic: string }
	>,
	res: Response
) => {
	const { message, subtopic } = req.body;
	const postId = req.params.postId;
	const profileId = req.session.user?.profile_id;
	const subtopicId = await pool.query(
		'SELECT subtopic_id FROM subtopic WHERE subtopic_name = $1',
		[subtopic]
	);

	const post = await pool.query(EDIT_POST_QUERY, [
		message,
		subtopicId,
		postId,
		profileId,
	]);

	res.status(200).json(post.rows[0]);
};

const POSTS_BY_SUBTOPIC_SQL = `SELECT
p.post_id, profile_name, message,
array_to_json(array_agg(file_path)) AS files,
title, p.created_at
FROM post p
LEFT JOIN file f on p.post_id = f.post_id
JOIN user_account u on p.user_id = u.user_id
JOIN profile pf on u.profile_id = pf.profile_id
WHERE subtopic_id = $1
GROUP BY p.post_id, pf.profile_name
ORDER BY created_at desc`;

const POSTS_BY_SUBTOPIC_SQLPOSTS_BY_USER_SQL = `SELECT p.post_id, profile_id, message,
array_to_json(array_agg(file_path)), title, created_at as files, created_at
FROM post p
LEFT JOIN file f ON p.post_id = f.post_id
WHERE p.profile_id = $1
GROUP BY p.post_id
ORDER BY created_at DESC`;

export const listPostsBySubtopic = async (
	req: Request<{ subtopicId: string }>,
	res: Response
) => {
	const subtopicId = req.params.subtopicId;

	const posts = await pool.query(POSTS_BY_SUBTOPIC_SQL, [subtopicId]);
	res.status(200).json(posts.rows);
};

export const listPostsByUser = async (
	req: Request<{ userId: string }>,
	res: Response
) => {
	const userId = req.params.userId;
	const posts = await pool.query(POSTS_BY_SUBTOPIC_SQLPOSTS_BY_USER_SQL, [
		userId,
	]);

	res.status(200).json(posts.rows);
};

export const listPostReplies = async (
	req: Request<{ parentId: number }>,
	res: Response
) => {
	const parentId = req.params.parentId;
	const posts = await pool.query('SELECT * FROM reply WHERE post_id = $1', [
		parentId,
	]);
	res.status(200).json(posts.rows);
};

export const getPostById = async (
	req: Request<{ postId: string }>,
	res: Response
) => {
	const postId = req.params.postId;
	const post = await pool.query('SELECT * FROM post WHERE post_id = $1', [
		postId,
	]);
	res.status(200).json(post.rows[0]);
};
