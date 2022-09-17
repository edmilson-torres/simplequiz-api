import { NextFunction, Request, Response } from 'express';

import AuthService from '../services/auth-service';
import AppError from '../utils/appError';
import { httpCode } from '../utils/httpCode';

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new AppError(
                'user or password missing',
                httpCode.BAD_REQUEST
            );
        }

        try {
            const user = await AuthService.login(email, password);
            res.status(200).json({ user });
        } catch (err) {
            next(err);
        }
    }

    public async resetPasswordRequest(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const email: string = req.body.email;
        if (!email) {
            throw new AppError('e-mail is missing', httpCode.BAD_REQUEST);
        }

        try {
            const mailLink = await AuthService.resetPasswordRequest(email);
            if (process.env.NODE_ENV === 'production') {
                return res.status(httpCode.OK).json({
                    message: 'password reset link sent to your email account '
                });
            } else {
                return res.status(httpCode.OK).json({
                    link: mailLink
                });
            }
        } catch (err) {
            next(err);
        }
    }

    public async resetPassword(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { userId, password, token } = req.body;
        if (!token || !userId || !password) {
            throw new AppError('missing credentials', httpCode.BAD_REQUEST);
        }
        try {
            await AuthService.resetPassword(userId, password, token);
            res.status(httpCode.OK).json({
                message: 'password reset successfully'
            });
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController;
