import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';
import { httpCode } from '../../src/utils/httpCode';
import QuizRepository from '../../src/repositories/quiz-repository';

let userAccessToken: string;

const quizMock = {
    category: 'new category',
    description: 'example',
    name: 'quiz example',
    createAt: '2022-03-21T01:31:42.020+00:00',
    questions: [
        {
            question: 'how to example 1?',
            answer: 'right answer',
            options: ['wrong  answer 1', 'wrong  answer 2', 'wrong  answer 3']
        },
        {
            question: 'how to example 2?',
            answer: 'right answer',
            options: ['wrong  answer 1', 'wrong  answer 2', 'wrong  answer 3']
        }
    ]
};

const invalidQuizMock = {
    category: 'new category',
    description: 'example'
};

describe('Integration Quiz create', () => {
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
        const res = await request(app).post('/api/quiz');
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return 400 for invalid quiz', async () => {
        const quizRepositorySpy = jest
            .spyOn(QuizRepository, 'createQuiz')
            .mockRejectedValue(new Error());
        const res = await request(app)
            .post('/api/quiz')
            .set('Authorization', `Bearer ${userAccessToken}`)
            .send(invalidQuizMock);
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(quizRepositorySpy).toBeCalledTimes(1);
    });

    it('should return Ok to create a new quiz', async () => {
        const res = await request(app)
            .post('/api/quiz')
            .set('Authorization', `Bearer ${userAccessToken}`)
            .send(quizMock);
        expect(res.statusCode).toBe(httpCode.CREATED);
        expect(res.body.quiz.name).toBe(quizMock.name);
    });
});
