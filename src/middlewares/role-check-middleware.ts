import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';
import { httpCode } from '../utils/httpCode';

type UserRoles = 'admin' | 'user';

const roleCheck = (rolesRoutes: Array<UserRoles>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { role } = res.locals.decodedToken;
        const roleExists = rolesRoutes.includes(role);

        if (!roleExists) {
            throw new AppError('forbidden', httpCode.FORBIDDEN);
        }

        return next();
    };
};

export default roleCheck;
