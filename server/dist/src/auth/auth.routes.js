import { Router } from 'express';
import { signIn, signOut, isLoggedIn } from './auth.model.js';
const router = Router();
router.post('/login', signIn);
router.get('/login', isLoggedIn);
router.post('/signout', signOut);
export default router;
