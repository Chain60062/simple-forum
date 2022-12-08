import pool from '../config/db.js';
import { jsonMessage } from '../helpers/jsonResponse.js';

export const addTopic = async (req, res, next) => {
  try {
    const sqlQuery = 'INSERT INTO topic(topic_name, description) VALUES($1, $2)';
    const { name, description } = req.body;
    await pool.query(sqlQuery, [name, description]);

    jsonMessage(res, 201, 'Tópico criado com sucesso');
  } catch (error) {
    next(error);
  }
};

export const deleteTopic = async (req, res, next) => {
  try {
    const topicId = req.params.id;
    const sqlQuery = 'DELETE FROM topic WHERE topic_id = $1';
    await pool.query(sqlQuery, [topicId]);

    jsonMessage(res, 200, 'Tópico deletado com sucesso');
  } catch (err) {
    next(err);
  }
};
export const editTopic = async (req, res, next) => {
  try {
    const topicId = req.params.id;
    const { name, description } = req.body;
    const sqlQuery = 'UPDATE topic SET topic_name = $1, description = $2 WHERE topic_id = $3';
    const topic = await pool.query(sqlQuery, [name, description, topicId]);

    res.status(200).json(topic.rows);
  } catch (err) {
    next(err);
  }
};
export const listTopics = async (req, res, next) => {
  try {
    const topics = pool.query('SELECT subtopic_name, description FROM topic ORDER BY topic_name');

    res.status(200).json(topics.rows);
  } catch (err) {
    next(err);
  }
};

