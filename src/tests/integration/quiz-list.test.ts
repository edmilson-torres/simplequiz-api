import request from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';
import UserModel from '../../database/models/user';
import QuizModel from '../../database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';
import { httpCode } from '../../utils/httpCode';
import QuizRepository from '../../repositories/quiz-repository';

let userAccessToken: string;

describe('Integration Quiz list', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
        await QuizModel.insertMany(quizzies);
        const userSignInResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@mail.com',
                password: '123456'
            });
        userAccessToken = userSignInResponse.body.user.token;
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

    it('should return 404 for empty list', async () => {
        const quizRepositorySpy = jest
            .spyOn(QuizRepository, 'findQuizList')
            .mockRejectedValue(new Error());
        const res = await request(app)
            .get('/api/quiz')
            .set('Authorization', `Bearer ${userAccessToken}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
        expect(quizRepositorySpy).toBeCalledTimes(1);
    });

    it('should return all quizzies', async () => {
        const res = await request(app)
            .get('/api/quiz')
            .set('Authorization', `Bearer ${userAccessToken}`);
        expect(res.statusCode).toBe(httpCode.OK);
    });
});
