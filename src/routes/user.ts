import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();
const userController = new UserController();

router.get('/users');
router.get('/users/:id', userController.findUserById);

export default router;
