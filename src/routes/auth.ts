import { Router } from 'express';
import UserController from '../controllers/user';
import AuthController from '../controllers/auth';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/auth/register', userController.createUser);
router.post('/auth/login', authController.login);
router.post('/auth/requestResetPassword', authController.resetPasswordRequest);
router.post('/auth/resetPassword', authController.resetPassword);

export default router;
