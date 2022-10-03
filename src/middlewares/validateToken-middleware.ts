import { Request, Response, NextFunction } from 'express';
import { httpCode } from '../utils/httpCode';
import AppError from '../utils/appError';
import { verifyJwt } from '../utils/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new AppError('token is missing', httpCode.UNAUTHORIZED);
    }

    const decoded = verifyJwt(token);

    if (decoded) {
        res.locals.decodedToken = decoded;
        next();
    } else {
        throw new AppError('token is wrong', httpCode.UNAUTHORIZED);
    }
};

export default validateToken;
