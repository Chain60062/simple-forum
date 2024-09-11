import { Router } from 'express'
import upload from '../config/multer.config.js'
import {
	createAdminAccount,
	createUser,
	deleteUser,
	editUser,
	getUserByUsername,
} from './users.model.js'
const router = Router()

router.post('/', upload.single('avatar'), createUser)
router.put('/', upload.single('avatar'), editUser)
router.delete('/', deleteUser)
router.get('/:username', getUserByUsername)
router.post('/admin', createAdminAccount)

export default router
