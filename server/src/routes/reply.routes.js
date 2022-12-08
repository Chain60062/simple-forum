import { Router } from 'express';
import {
  addReply,
  deleteReply,
  editReply,
  listPostReplies
} from '../model/reply.model.js';
import { isAuthenticated } from '../middleware/auth.js';
import upload from '../config/multer.config.js';
const router = Router();

router.post('/:postId/:parentId?', isAuthenticated, upload.array('files', 4), addReply);
router.get('/:postId', listPostReplies)
router.patch('/:id', isAuthenticated, editReply);
router.delete('/:id', isAuthenticated, deleteReply);

export default router;

