import { Request, Response, NextFunction } from 'express';
// import { verifyJwt } from '../utils/jwt';

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // const authHeaders = req.headers.authorization;

  // if (!authHeaders) {
  //   res.status(401);
  //   throw new Error('token is missing');
  // }

  // const token = req.headers.authorization?.split(' ')[1];

  // const decoded = verifyJwt(token);

  // console.log(res.locals.decodedToken);

  const { role } = res.locals.decodedToken;

  if (role === 'admin') {
    next();
  } else {
    res.status(403);
    throw new Error('forbidden');
  }
};

export default isAdmin;
