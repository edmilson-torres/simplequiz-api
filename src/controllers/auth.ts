import { Request, Response } from 'express';

import UserRepository from '../repositories/user';
import { compareStringHash } from '../utils/hash';
import { signJwt } from '../utils/jwt';

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422);
      throw Error('user or password incorrect');
    }

    if (!password) {
      res.status(422);
      throw Error('user or password incorrect');
    }

    const user = await UserRepository.findUserByEmail(email);

    if (!user) {
      res.status(404);
      throw Error('user or password incorrect');
    }

    const passwordIsValid = await compareStringHash(password, user.password);

    if (!passwordIsValid) {
      res.status(401);
      throw Error('user or password incorrect');
    }

    try {
      const payload: Object = { id: user._id };
      const token = signJwt(payload, {
        expiresIn: `${process.env.NODE_ENV === 'dev' ? '180m' : '5m'}`
      });
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
      });
    } catch (err) {
      res.status(500);
      throw Error('server error');
    }
  }
}

export default AuthController;
