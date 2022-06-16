import { Request, Response } from 'express';
import UserService from '../services/user';

class UserController {
    public async findUsers(req: Request, res: Response) {
        const { role } = res.locals.decodedToken;
        try {
            if (role === 'admin') {
                const users = await UserService.findUsers();
                res.json(users);
            } else {
                res.status(401).json({ error: 'unauthorized' });
            }
        } catch (err) {
            res.status(404);
            throw new Error('not found');
        }
    }

    public async findUserById(req: Request, res: Response) {
        const { sub, role } = res.locals.decodedToken;
        const { id } = req.params;
        if (role === 'admin' || sub === id) {
            try {
                const user = await UserService.findUserById(id);
                if (!user) {
                    res.status(404);
                    throw new Error('user not found');
                }
                res.json(user);
            } catch (err) {
                res.status(422);
                throw new Error('user not found');
            }
        } else {
            res.status(401);
            throw new Error('unauthorized');
        }
    }

    public async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await UserService.deleteUser(id);
            res.json({ message: 'resource deleted successfully' });
        } catch (err) {
            res.status(404);
            throw new Error('not found');
        }
    }

    public async createUser(req: Request, res: Response) {
        try {
            const user = await UserService.createUser(req.body);
            res.status(201).json({ message: 'user created', user: user });
        } catch (err) {
            if (err.code === 11000) {
                res.status(409);
                throw new Error('account already exists');
            } else {
                res.status(400);
                throw new Error(err.message);
            }
        }
    }

    public async updateUser(req: Request, res: Response) {
        const { sub, role } = res.locals.decodedToken;
        const { id } = req.params;
        const name = req.body.name;
        const userRole = req.body.role;
        try {
            if (sub === id) {
                const updatedUser = await UserService.updateUser(id, name);
                res.status(200).json({
                    message: 'user updated',
                    data: updatedUser
                });
            } else if (role === 'admin') {
                const updatedUser = await UserService.updateUser(
                    id,
                    name,
                    userRole
                );
                res.status(200).json({
                    message: 'user updated',
                    data: updatedUser
                });
            } else {
                res.status(401).json({ error: 'unauthorized' });
            }
        } catch (err) {
            res.status(err.status);
            throw new Error(err.message);
        }
    }
}

export default UserController;
