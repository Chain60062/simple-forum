import { Router } from 'express';
import { createUser, deleteUser, editUser, getUserByUsername } from './users.model.js';
import upload from '../config/multer.config.js';

const router = Router();

router.post('/', upload.single('avatar'), createUser);
router.put('/', upload.single('avatar'), editUser);
router.delete('/', deleteUser);
router.get('/:username', getUserByUsername);
export default router;


