import { NextFunction, Request, Response } from 'express';
import UserService from '../services/user-service';
import { httpCode } from '../utils/httpCode';

class UserController {
    public async findUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.findUsers();
            res.json(users);
        } catch (err) {
            next(err);
        }
    }

    public async findUserById(req: Request, res: Response, next: NextFunction) {
        const { sub, role } = res.locals.decodedToken;
        const { id } = req.params;

        try {
            const result = await UserService.findUserById(id, sub, role);
            res.send(result);
        } catch (err) {
            next(err);
        }
    }

    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;

        try {
            await UserService.deleteUser(id);
            res.status(httpCode.NO_CONTENT).send();
        } catch (err) {
            next(err);
        }
    }

    public async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(httpCode.CREATED).json({
                message: 'user created',
                user: user
            });
        } catch (err) {
            next(err);
        }
    }

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        const { sub, role } = res.locals.decodedToken;
        const { id } = req.params;
        const requestName = req.body.name;
        const requestRole = req.body.role;

        try {
            const result = await UserService.updateUser(
                sub,
                role,
                id,
                requestName,
                requestRole
            );
            res.send(result);
        } catch (err) {
            next(err);
        }
    }
}

export default UserController;
