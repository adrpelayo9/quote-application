import express from 'express';
import * as usersController from '../controllers/users.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', usersController.getUsers);
router.patch('/', usersController.updateUser);
router.delete('/:user', usersController.deleteUser);
router.delete('/admin/:id', isAdmin, usersController.adminDeleteUser);

export default router;