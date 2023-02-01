import {Router} from 'express';
import { addTopic, deleteTopic, editTopic, listTopics } from './topics.model.js';
const router = Router();

router.get('/', listTopics);
router.post('/', addTopic);
router.patch('/:id', editTopic);
router.delete('/:id', deleteTopic);

export default router;

