import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import UserController from '../controllers/user';

const router = Router();
const userController = new UserController();

router.get('/users', validateToken, userController.findUsers);
router.get('/users/:id', validateToken, userController.findUserById);
router.delete('/users/:id', validateToken, userController.deleteUser);

export default router;