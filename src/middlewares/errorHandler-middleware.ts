import { Request, Response, NextFunction } from 'express';

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    if (process.env.NODE_ENV === 'production') {
        res.json({
            error: err.message
        });
    } else {
        res.json({
            error: err.message,
            stack: err.stack
        });
    }
};

export default errorHandler;
