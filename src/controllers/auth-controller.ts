import { Request, Response } from 'express';

import AuthService from '../services/auth-service';

class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422);
            throw new Error('user or password missing');
        }

        const user = await AuthService.login(email, password);

        if (!user) {
            res.status(401);
            throw new Error('user or password incorrect');
        }
        res.status(200).json({ user });
    }

    public async resetPasswordRequest(req: Request, res: Response) {
        const email = req.body.email;
        try {
            const mailLink = await AuthService.resetPasswordRequest(email);
            if (process.env.NODE_ENV === 'production') {
                return res.status(200).json({
                    message: 'password reset link sent to your email account '
                });
            } else {
                return res.status(200).json({
                    testMailLink: mailLink
                });
            }
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }

    public async resetPassword(req: Request, res: Response) {
        const { userId, password, token } = req.body;
        if (!token || !userId || !password) {
            res.status(400);
            throw new Error('invalid credentials');
        }
        try {
            await AuthService.resetPassword(userId, password, token);
            res.status(200).json({ message: 'password reset successfully' });
        } catch (err) {
            res.status(400);
            throw new Error(err.message);
        }
    }
}

export default AuthController;
