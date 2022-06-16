import { Request, Response } from 'express';

import AuthService from '../services/auth';

class AuthController {
    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(422);
            throw Error('user or password missing');
        }

        const user = await AuthService.login(email, password);

        if (!user) {
            res.status(401);
            throw Error('user or password incorrect');
        }
        res.status(200).json({ user });
    }

    public async resetPassword(req: Request, res: Response) {}

    public async resetPasswordRequest(req: Request, res: Response) {}
}

export default AuthController;
