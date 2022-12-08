import { Router } from 'express';
import { addSubtopic, deleteSubtopic, editSubtopic, listSubtopics } from '../model/topic.model.js';
const router = Router();

router.get('/', listSubtopics);
router.post('/:topicId', addSubtopic);
router.patch('/:id', editSubtopic);
router.delete('/:id', deleteSubtopic);

export default router;

