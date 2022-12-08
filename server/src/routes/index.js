import { Router } from 'express';
import userRouter from './user.routes.js';
import authRouter from './auth.routes.js';
import postRouter from './post.routes.js';
import topicRouter from './topic.routes.js';
import replyRouter from './reply.routes.js';
// import subtopicRouter from './subtopic.routes.js';

const router = new Router();
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/topic', topicRouter);
// router.use('/subtopic', subtopicRouter);
router.use('/reply', replyRouter);
export default router;

