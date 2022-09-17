import request from 'supertest';
import app from '../../src/app';

import * as sendTestEmail from '../../src/utils/email/sendTestMail';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';

describe('Integration Auth request reset password', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
        await QuizModel.insertMany(quizzies);
    });
    afterAll(async () => {
        await QuizModel.deleteMany();
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should return 200 with a reset link', async () => {
        const spy = jest
            .spyOn(sendTestEmail, 'sendTestEmail')
            .mockResolvedValue('tokenMock');
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'test@mail.com' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('link');
        expect(res.body.link).toBe('tokenMock');
        expect(spy).toBeCalledTimes(1);
    });
    it('should return 404 e-mail not registered ', async () => {
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'not.registered.email@mail.com' });
        expect(res.statusCode).toBe(404);
    });
    it('should return 400 invalid e-mail', async () => {
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'invalidmail.com' });
        expect(res.statusCode).toBe(400);
    });
});
