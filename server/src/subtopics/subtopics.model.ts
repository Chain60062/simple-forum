import type { Request, Response } from 'express';
import pool from '../db/db.js';

export const addSubtopic = async (
	req: Request<
		{ topicId: string },
		object,
		{ subtopic_name: string; description: string }
	>,
	res: Response
) => {
	const topicId = req.params.topicId;
	const { subtopic_name, description } = req.body;
	const sqlQuery =
		'INSERT INTO subtopic(subtopic_name, topic_id, description) VALUES($1, $2, $3) RETURNING subtopic_name, subtopic_id, description';
	const subtopic = await pool.query(sqlQuery, [
		subtopic_name,
		topicId,
		description,
	]);

	res.status(200).json(subtopic.rows[0]);
};

export const deleteSubtopic = async (req: Request, res: Response) => {
	const topicId = req.params.id;
	const sqlQuery = 'DELETE FROM subtopic WHERE subtopic_id = $1';
	await pool.query(sqlQuery, [topicId]);

	res.status(200).json('Subtópico deletado com sucesso');
};
export const editSubtopic = async (
	req: Request<{ subtopicId: string }>,
	res: Response
) => {
	const topicId = req.params.subtopicId;
	const { name, description } = req.body;
	const sqlQuery =
		'UPDATE subtopic SET subtopic_name = $1, description = $2 WHERE topic_id = $3';
	const subtopic = await pool.query(sqlQuery, [name, description, topicId]);

	res.sendStatus(200).json(subtopic.rows[0]);
};

export const listSubtopics = async (req: Request, res: Response) => {
	const topicId = req.params.topicId;
	const subtopics = await pool.query(
		'SELECT subtopic_id, subtopic_name, description FROM subtopic WHERE topic_id = $1 ORDER BY subtopic_name',
		[topicId]
	);
	res.status(200).json(subtopics.rows);
};
