import crypto from 'crypto';

import env from '../config/env';
import { sendEmail } from '../libs/email/sendEmail';
import { sendTestEmail } from '../libs/email/sendTestMail';
import { compareStringHash, createStringHash } from '../libs/hash';
import { signJwt } from '../libs/jwt';
import ResetPasswordTokenRepository from '../repositories/token-repository';
import UserRepository from '../repositories/user-repository';
import UserService from '../services/user-service';
import AppError from '../utils/appError';
import { httpCode } from '../utils/httpCode';
import emailValidator from '../utils/validators/email-validator';
import tokenValidator from '../utils/validators/token-validator';

class AuthService {
    static async login(email: string, password: string) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            throw new AppError(
                'user or password incorrect',
                httpCode.BAD_REQUEST
            );
        }
        const { _id } = user;
        const passwordIsValid = await compareStringHash(
            password,
            user.password
        );
        if (!passwordIsValid) {
            throw new AppError(
                'user or password incorrect',
                httpCode.BAD_REQUEST
            );
        }

        try {
            const payload: { sub: string; role: string } = {
                sub: _id,
                role: user.role
            };
            const token = signJwt(payload, {
                expiresIn: `${process.env.NODE_ENV === 'dev' ? '180m' : '5m'}`
            });
            return {
                id: _id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (err) {
            throw new Error('err.message');
        }
    }

    static async resetPasswordRequest(email: string) {
        try {
            await emailValidator(email);
        } catch (err) {
            throw new AppError('invalid e-mail', httpCode.BAD_REQUEST);
        }
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            throw new AppError('email not registered', httpCode.NOT_FOUND);
        }
        const { _id } = user;
        const token = await ResetPasswordTokenRepository.findById(String(_id));
        if (token) await ResetPasswordTokenRepository.deleteToken(String(_id));

        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await createStringHash(resetToken);
        const userToken = { userId: String(_id), token: hash };
        await ResetPasswordTokenRepository.insertUserToken(userToken);

        const link = `${env.clientUrl}/password-reset/${_id}/${resetToken}`;
        if (process.env.NODE_ENV === 'production') {
            await sendEmail(
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
            const testMailLink = await sendTestEmail(
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
                throw new AppError('invalid credentials', httpCode.BAD_REQUEST);
            }

            const isValidToken = await compareStringHash(
                token,
                passwordResetToken.token
            );
            if (!isValidToken) {
                throw new AppError('invalid credentials', httpCode.BAD_REQUEST);
            }

            const pass = password.toString();
            const hash = await createStringHash(pass);
            const user = await UserRepository.updatePassword(userId, hash);

            sendEmail(
                user.email,
                'Password Reset Successfully',
                {
                    name: user.name
                },
                'templates/resetPassword.handlebars'
            );
            await ResetPasswordTokenRepository.deleteToken(userId);
            return;
        } catch (err) {
            throw new AppError(err.message, err.statusCode);
        }
    }
}

export default AuthService;
