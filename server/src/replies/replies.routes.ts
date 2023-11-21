import { Router } from 'express';
import {
  addReply,
  deleteReply,
  editReply,
  getPostReplies
} from '../replies/replies.model.js';
import { isAuthenticated } from '../auth/auth.middleware.js';
const router = Router();

router.get('/:postId', getPostReplies)
router.post('/:postId/:parentId?', isAuthenticated, addReply);
router.patch('/:replyId', isAuthenticated, editReply);
router.delete('/:replyId', isAuthenticated, deleteReply);

export default router;

