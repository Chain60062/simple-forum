import { Router } from 'express';
import { addPost, deletePost, editPost, listPostsBySubtopic, listPostsByUser, getPostById } from './posts.model.js';
import { isAuthenticated } from '../auth/auth.middleware.js';
import upload from '../config/multer.config.js';
const router = Router();

router.get('/subtopic/:subtopicId', listPostsBySubtopic);
router.get('/user/:userId', listPostsByUser);
router.get('/:postId', getPostById);
router.post('/:subtopicId', isAuthenticated, upload.array('files', 3), addPost);
router.patch('/:postId', isAuthenticated, editPost);
router.delete('/:postId', isAuthenticated, deletePost);

export default router;


