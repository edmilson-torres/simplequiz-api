import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { httpCode } from '../utils/httpCode';
import AppError from '../utils/appError';

const rateLimitMiddleware = ({
    requestWindowInSeconds = 60,
    maxConnections = 30
}: {
    requestWindowInSeconds?: number;
    maxConnections?: number;
} = {}) =>
    rateLimit({
        windowMs: requestWindowInSeconds * 1000,
        max: maxConnections,
        keyGenerator(req: Request): string {
            return req.ip;
        },
        handler(_, res: Response): void {
            throw new AppError('too many request', httpCode.TOO_MANY_REQUESTS);
        }
    });

export default rateLimitMiddleware;
