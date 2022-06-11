import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import UserController from '../controllers/user';
import roleCheck from '../middlewares/roleCheck';

const router = Router();
const userController = new UserController();

router.get('/users', validateToken, userController.findUsers);
router.get('/users/:id', validateToken, userController.findUserById);
router.delete(
    '/users/:id',
    validateToken,
    roleCheck(['admin']),
    userController.deleteUser
);
router.put('/users/:id', validateToken, userController.updateUser);

export default router;
