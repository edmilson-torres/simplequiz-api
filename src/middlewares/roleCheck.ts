import { Request, Response, NextFunction } from 'express';

type UserRoles = 'admin' | 'user';

const roleCheck = (rolesRoutes: Array<UserRoles>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { role } = res.locals.decodedToken;
    const roleExists = rolesRoutes.includes(role);

    if (!roleExists) {
      res.status(401);
      throw new Error('unauthorized');
    }

    return next();
  };
};

export default roleCheck;
