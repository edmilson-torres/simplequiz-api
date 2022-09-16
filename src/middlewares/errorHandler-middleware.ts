import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { httpCode } from '../utils/httpCode';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    if (err instanceof SyntaxError) {
        return res.status(httpCode.BAD_REQUEST).json({ error: err.message });
    }

    console.log(err);

    return res
        .status(httpCode.INTERNAL_SERVER_ERROR)
        .json({ error: 'testando' });
};

export default errorHandler;
