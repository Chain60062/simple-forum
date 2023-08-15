import { Router } from 'express';
import { createUser, deleteUser, editUser, getUserByUsername, getUserByEmail, } from './users.model.js';
import upload from '../config/multer.config.js';
import { body } from 'express-validator';
const router = Router();
router.post('/', upload.single('avatar'), body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Campo e-mail está em formato incorreto')
    .custom((email) => {
    return getUserByEmail(email).then((user) => {
        if (user) {
            return Promise.reject('E-mail já está em uso');
        }
    });
}), body('password')
    .isLength({ min: 6, max: 256 })
    .withMessage('A senha deve ter no mínimo 6 caractéres e no máximo 256'), createUser);
router.put('/', upload.single('avatar'), editUser);
router.delete('/', deleteUser);
router.get('/:username', getUserByUsername);
export default router;
