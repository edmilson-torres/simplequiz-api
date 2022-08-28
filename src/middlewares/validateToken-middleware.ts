import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        res.status(401);
        throw new Error('token is missing');
    }

    const token = req.headers.authorization?.split(' ')[1];

    const decoded = verifyJwt(token);

    if (decoded) {
        res.locals.decodedToken = decoded;
        next();
    } else {
        res.status(401);
        throw new Error('unauthorized');
    }
};

export default validateToken;
