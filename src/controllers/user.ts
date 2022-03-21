import UserModel from '../database/models/user';
import { createStringHash } from '../utils/hash';
import { Request, Response } from 'express';
import UserRepository from '../repositories/user';

class UserController {
  public async findUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.findUserList();
      res.json(users);
    } catch (err) {
      res.status(404);
      throw new Error('not found');
    }
  }

  public async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserRepository.findUserById(id);
      if (!user) {
        res.status(404);
        throw new Error('not found');
      }

      res.json(user);
    } catch (err) {
      res.status(422);
      throw new Error('user not found');
    }
  }

  public async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserRepository.findUserById(id);

    if (!user) {
      res.status(422);
      throw new Error('user not found');
    }

    try {
      await UserRepository.deleteUser(id);
      res.json({ message: 'resource deleted successfully' });
    } catch (err) {
      res.status(500);
      throw new Error('server error');
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const passwordHased = await createStringHash(password);
      const role = 'user';

      const userModel = new UserModel({
        name,
        email,
        password: passwordHased,
        role
      });
      await UserRepository.createUser(userModel);
      res.status(201).json({ message: 'user created' });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409);
        throw new Error('account already exists');
      }
      res.status(400);
      throw new Error('bad request');
    }
  }
}

export default UserController;
