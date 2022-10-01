import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';
import { httpCode } from '../../src/utils/httpCode';

describe('Integration Quiz list', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
        await QuizModel.insertMany(quizzies);
    });
    afterAll(async () => {
        await QuizModel.deleteMany();
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should return unauthorized, without token', async () => {
        const res = await request(app).get('/api/quiz');
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return all quizzies', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/quiz')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.OK);
    });
});
