import UserController from '../controllers/user';
import { Router } from 'express';

const router = Router();
const userController = new UserController();

router.post('/auth/register', userController.createUser);
router.post('/auth/login');
router.post('/auth/passwordreset');

export default router;
