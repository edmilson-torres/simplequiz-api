import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

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
      res.status(429);
      throw new Error('too many request');
    }
  });

export default rateLimitMiddleware;
