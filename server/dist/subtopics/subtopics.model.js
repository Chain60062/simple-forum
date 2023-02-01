import pool from '../config/db/db.js';
export const addSubtopic = async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const { subtopic_name, description } = req.body;
        const sqlQuery = 'INSERT INTO subtopic(subtopic_name, topic_id, description) VALUES($1, $2, $3) RETURNING subtopic_name, subtopic_id, description';
        const subtopic = await pool.query(sqlQuery, [subtopic_name, topicId, description]);
        res.status(200).json(subtopic.rows[0]);
    }
    catch (error) {
        next(error);
    }
};
export const deleteSubtopic = async (req, res, next) => {
    try {
        const topicId = req.params.id;
        const sqlQuery = 'DELETE FROM subtopic WHERE subtopic_id = $1';
        await pool.query(sqlQuery, [topicId]);
        res.status(201).json('Subtópico deletado com sucesso');
    }
    catch (err) {
        next(err);
    }
};
export const editSubtopic = async (req, res, next) => {
    try {
        const topicId = req.params.subtopicId;
        const { name, description } = req.body;
        const sqlQuery = 'UPDATE subtopic SET subtopic_name = $1, description = $2 WHERE topic_id = $3';
        const subtopic = await pool.query(sqlQuery, [name, description, topicId]);
        res.send(200).json(subtopic.rows[0]);
    }
    catch (err) {
        next(err);
    }
};
export const listSubtopics = async (req, res, next) => {
    try {
        const topicId = req.params.topicId;
        const subtopics = await pool.query('SELECT subtopic_id, subtopic_name, description FROM subtopic WHERE topic_id = $1 ORDER BY subtopic_name', [topicId]);
        res.status(200).json(subtopics.rows);
    }
    catch (err) {
        next(err);
    }
};
