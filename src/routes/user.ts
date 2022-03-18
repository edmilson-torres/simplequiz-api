import { Router } from 'express';
import UserController from '../controllers/user';

const router = Router();
const userController = new UserController();

router.get('/users', userController.findUsers);
router.get('/users/:id', userController.findUserById);
router.delete('/users/:id', userController.deleteUser);

export default router;
