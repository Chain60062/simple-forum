import { Router } from 'express'
import { isLoggedIn, login, signOut } from './auth.model.js'
const router: Router = Router()

router.post('/login', login)
router.get('/login', isLoggedIn)
router.post('/signout', signOut)

export default router
