import { Router } from 'express';

import validateToken from '../middlewares/validateToken-middleware';
import UserController from '../controllers/user-controller';
import roleCheck from '../middlewares/role-check-middleware';

const router = Router();
const userController = new UserController();

router.get(
    '/users',
    validateToken,
    roleCheck(['admin']),
    userController.findUsers
);
router.get('/users/:id', validateToken, userController.findUserById);
router.delete(
    '/users/:id',
    validateToken,
    roleCheck(['admin']),
    userController.deleteUser
);
router.put('/users/:id', validateToken, userController.updateUser);

export default router;
