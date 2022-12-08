import { Router } from 'express';
import {
  addPost,
  deletePost,
  editPost,
  listPostsBySubtopic,
  listPostsByUser,
} from '../model/post.model.js';
import { isAuthenticated } from '../middleware/auth.js';
import upload from '../config/multer.config.js';
const router = Router();

router.get('/subtopic/:id', listPostsBySubtopic);
router.get('/user/:userId', listPostsByUser);
router.post('/:subtopicId', isAuthenticated, upload.array('files', 3), addPost);
router.patch('/:id', isAuthenticated, editPost);
router.delete('/:id', isAuthenticated, deletePost);

export default router;

