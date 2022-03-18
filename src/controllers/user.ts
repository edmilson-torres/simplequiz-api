import UserModel from '@/database/models/user';
import { Request, Response } from 'express';
import UserRepository from '../repositories/user';

class UserController {
  public async findUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserRepository.findUserById(id);
      res.json(user);
    } catch (err) {
      res.status(404);
      throw new Error('not found');
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const role = 'user';
      const createAt = new Date().toISOString();
      const userModel = new UserModel({
        name,
        email,
        password,
        role,
        createAt
      });
      const user = await UserRepository.createUser(userModel);
      res.status(201).json(user);
    } catch (err) {
      res.status(400);
      throw new Error('bad request');
    }
  }
}

export default UserController;
