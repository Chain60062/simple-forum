import { Router } from 'express';
import userRouter from './user.routes.js';
import authRouter from './auth.routes.js';
import postRouter from './post.routes.js';
import topicRouter from './topic.routes.js';
import subtopicRouter from './subtopic.routes.js';
import replyRouter from './reply.routes.js';

const router = new Router();
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/topics', topicRouter);
router.use('/subtopics', subtopicRouter);
router.use('/reply', replyRouter);
export default router;


