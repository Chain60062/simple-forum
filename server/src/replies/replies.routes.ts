import { Router } from 'express';
import {
  addReply,
  deleteReply,
  editReply,
  getPostReplies
} from '../replies/replies.model.js';
import { isAuthenticated } from '../auth/auth.middleware.js';
import upload from '../config/multer.config.js';
const router = Router();

router.get('/:postId', getPostReplies)
router.post('/:postId/:parentId?', isAuthenticated, upload.array('files', 4), addReply);
router.patch('/:replyId', isAuthenticated, editReply);
router.delete('/:replyId', isAuthenticated, deleteReply);

export default router;
