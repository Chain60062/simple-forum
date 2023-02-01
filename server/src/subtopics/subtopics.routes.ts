import { Router } from 'express';
import { addSubtopic, deleteSubtopic, editSubtopic, listSubtopics } from './subtopics.model.js';
const router = Router();

router.get('/:topicId', listSubtopics);
router.post('/:topicId', addSubtopic);
router.patch('/:id', editSubtopic);
router.delete('/:id', deleteSubtopic);

export default router;


