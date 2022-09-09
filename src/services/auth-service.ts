import crypto from 'crypto';
import bcrypt from 'bcrypt';

import env from '../config/env';
import ResetPasswordToken from '../database/models/resetPasswordToken';
import UserRepository from '../repositories/user-repository';
import ResetPasswordTokenRepository from '../repositories/token-repository';
import UserService from '../services/user-service';
import tokenValidator from '../utils/tokenValidator';
import emailValidator from '../utils/emailValidator';
import { compareStringHash } from '../utils/hash';
import { signJwt } from '../utils/jwt';
import { sendEmail } from '../utils/email/sendEmail';
import { sendTestEmail } from '../utils/email/sendTestMail';
import User from '../entities/user';
import AppError from 'utils/appError';
import { httpCode } from 'utils/httpCode';

class AuthService {
    static async login(email: string, password: string) {
        const user: User = await UserRepository.findUserByEmail(email);
        if (!user) {
            return false;
        }
        const { id } = user;
        const passwordIsValid = await compareStringHash(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return false;
        }

        try {
            const payload: Object = { sub: id, role: user.role };
            const token = signJwt(payload, {
                expiresIn: `${process.env.NODE_ENV === 'dev' ? '180m' : '5m'}`
            });
            return {
                id: id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (err) {
            throw new Error('server error');
        }
    }

    static async resetPasswordRequest(email: string) {
        await emailValidator({ email });
        const user: User = await UserService.findUserByEmail(email);
        if (!user) {
            throw Error('email not registered');
        }
        const { id } = user;
        const token = await ResetPasswordToken.findOne({ userId: id });
        if (token) await token.deleteOne();

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, 10);

        await new ResetPasswordToken({
            userId: id,
            token: hash,
            createdAt: Date.now()
        }).save();

        const link = `${env.clientUrl}/password-reset/${id}/${resetToken}`;
        if (process.env.NODE_ENV === 'production') {
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
        } else {
            const testMailLink = sendTestEmail(
                user.email,
                'Password Reset Request',
                {
                    name: user.name,
                    link: link
                },
                'templates/requestResetPassword.handlebars'
            );
            return testMailLink;
        }
    }

    static async resetPassword(
        userId: string,
        password: string,
        token: string
    ) {
        await tokenValidator(userId, password, token);
        try {
            const passwordResetToken =
                await ResetPasswordTokenRepository.findById(userId);
            if (!passwordResetToken) {
                throw new Error('invalid credentials');
            }

            const isValid = await bcrypt.compare(
                token,
                passwordResetToken.token
            );
            if (!isValid) {
                throw new Error('invalid credentials');
            }

            const pass = password.toString();
            const hash = await bcrypt.hash(pass, Number(12));
            const user: User = await UserRepository.updatePassword(
                userId,
                hash
            );
            if (!user) {
                throw new AppError(
                    'email not registered',
                    httpCode.BAD_REQUEST
                );
            }
            sendEmail(
                user.email,
                'Password Reset Successfully',
                {
                    name: user.name
                },
                'templates/resetPassword.handlebars'
            );
            await ResetPasswordTokenRepository.deleteToken(userId);

            return user;
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default AuthService;
