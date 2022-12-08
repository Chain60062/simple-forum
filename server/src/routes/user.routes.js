import { Router } from 'express';
import { createUser, deleteUser, editUser } from '../model/user.model.js';
import upload from '../config/multer.config.js';

const router = Router();

router.post('/', upload.single('avatar'), createUser);
router.put('/', upload.single('avatar'), editUser);
router.delete('/', deleteUser);

export default router;

