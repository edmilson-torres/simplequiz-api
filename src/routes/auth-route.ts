import { Router } from 'express';
import UserController from '../controllers/user-controller';
import AuthController from '../controllers/auth-controller';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/auth/register', userController.createUser);
router.post('/auth/login', authController.login);
router.post('/auth/requestresetpassword', authController.resetPasswordRequest);
router.post('/auth/resetpassword', authController.resetPassword);

export default router;
