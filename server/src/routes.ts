import { Router } from 'express'
import authRouter from './auth/auth.routes.js'
import postRouter from './posts/posts.routes.js'
import replyRouter from './replies/replies.routes.js'
import subtopicRouter from './subtopics/subtopics.routes.js'
import topicRouter from './topics/topics.routes.js'
import userRouter from './users/users.routes.js'

const router = Router()
router.use('/users', userRouter)
router.use('/auth', authRouter)
router.use('/posts', postRouter)
router.use('/topics', topicRouter)
router.use('/subtopics', subtopicRouter)
router.use('/replies', replyRouter)

export default router
