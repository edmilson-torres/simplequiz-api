import crypto from 'crypto';
import bcrypt from 'bcrypt';

import env from '../config/env';
import Token from '../database/models/token';
import UserRepository from '../repositories/user';
import TokenRepository from '../repositories/token';
import UserService from '../services/user';
import tokenValidator from '../utils/tokenValidator';
import emailValidator from '../utils/emailValidator';
import { compareStringHash } from '../utils/hash';
import { signJwt } from '../utils/jwt';
import { sendEmail } from '../utils/email/sendEmail';

class AuthService {
    static async login(email: string, password: string) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            return false;
        }
        const passwordIsValid = await compareStringHash(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return false;
        }

        try {
            const payload: Object = { sub: user._id, role: user.role };
            const token = signJwt(payload, {
                expiresIn: `${process.env.NODE_ENV === 'dev' ? '180m' : '5m'}`
            });
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (err) {
            throw new Error('server error');
        }
    }

    static async resetPasswordRequest(email: string) {
        await emailValidator({ email })
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            throw Error('email not registered');
        }
        // colocar no auth repository
        const token = await Token.findOne({ userId: user._id });
        if (token) await token.deleteOne();

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        await new Token({
            userId: user._id,
            token: hash,
            createdAt: Date.now()
        }).save();

        const link = `${env.clientUrl}/password-reset/${user._id}/${resetToken}`;

        sendEmail(
            user.email,
            'Password Reset Request',
            {
                name: user.name,
                link: link
            },
            'templates/requestResetPassword.handlebars'
        );
        return true;
    }

    static async resetPassword(
        userId: string,
        password: string,
        token: string
    ) {
        await tokenValidator(userId, password, token);
        try {
            const passwordResetToken = await TokenRepository.findById(userId);
            if (!passwordResetToken) {
                throw new Error('invalid credentials');
            }

            const isValid = await bcrypt.compare(token, passwordResetToken.token);
            if (!isValid) {
                throw new Error('invalid credentials');
            }

            const pass = password.toString()
            const hash = await bcrypt.hash(pass, Number(12));
            await UserRepository.updatePassword(userId, hash)

            const user = await UserRepository.findUserById(userId);
            sendEmail(
                user.email,
                'Password Reset Successfully',
                {
                    name: user.name
                },
                'templates/resetPassword.handlebars'
            );
            await TokenRepository.deleteToken(userId)

            return user;
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

export default AuthService;
