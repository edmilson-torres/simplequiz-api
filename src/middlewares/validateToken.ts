import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    const decoded = verifyJwt(token);
    if (decoded) {
      next();
    } else {
      res.status(401);
      throw new Error('unauthorized');
    }
  } else {
    res.status(401);
    throw new Error('unauthorized');
  }
};

export default validateToken;
