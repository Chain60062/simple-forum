import type { Request, Response } from 'express';
import pool from '../db/db.js';

export const addTopic = async (
	req: Request<object, object, { topic_name: string; description: string }>,
	res: Response
) => {
	const sqlQuery =
		'INSERT INTO topic(topic_name, description) VALUES($1, $2) RETURNING topic_name, description, topic_id';
	const { topic_name, description } = req.body;

	const topic = await pool.query(sqlQuery, [topic_name, description]);

	res.status(200).json(topic.rows[0]);
};

export const deleteTopic = async (
	req: Request<{ topicId: string }>,
	res: Response
) => {
	const topicId = req.params.topicId;
	const sqlQuery = 'DELETE FROM topic WHERE topic_id = $1';
	const deletedTopic = await pool.query(sqlQuery, [topicId]);

	if (deletedTopic.rowCount !== 1) {
		res.status(400).json('Não foi possível remover o tópico.');
		return;
	}

	res.status(200).json('Tópico removido com sucesso.');
};

export const editTopic = async (
	req: Request<{ topicId: string }>,
	res: Response
) => {
	const topicId = req.params.topicId;
	const { name, description } = req.body;
	const sqlQuery =
		'UPDATE topic SET topic_name = $1, description = $2 WHERE topic_id = $3';
	const topic = await pool.query(sqlQuery, [name, description, topicId]);

	res.status(200).json(topic.rows);
};

export const listTopics = async (req: Request, res: Response) => {
	const topics = await pool.query(
		'SELECT topic_id, topic_name, description FROM topic ORDER BY topic_name'
	);

	res.status(200).json(topics.rows);
};
