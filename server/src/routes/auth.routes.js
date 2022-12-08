import { Router } from 'express';
import { signIn, signOut } from '../model/auth.model.js';
const router = new Router();

router.post('/signin', signIn);
router.post('/signout', signOut);

export default router;

