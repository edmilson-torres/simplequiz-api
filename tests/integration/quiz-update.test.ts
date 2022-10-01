import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';
import { httpCode } from '../../src/utils/httpCode';

let userAccessToken: string;
let adminAccessToken: string;

describe('Integration User update', () => {
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
        const adminSignInResponse = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'admin@mail.com',
                password: '123456'
            });
        adminAccessToken = adminSignInResponse.body.user.token;
    });

    afterAll(async () => {
        await QuizModel.deleteMany();
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should return unauthorized, without token', async () => {
        const res = await request(app).put(
            '/api/quiz/622e7790d66360235541d2f7'
        );
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return forbidden, without admin role', async () => {
        const res = await request(app)
            .put('/api/quiz/622e7790d66360235541d2f7')
            .set('Authorization', `Bearer ${userAccessToken}`);
        expect(res.statusCode).toBe(httpCode.FORBIDDEN);
    });

    it('should return not found if quiz not exist', async () => {
        const res = await request(app)
            .put('/api/quiz/622e7790d66360235541d2f6')
            .set('Authorization', `Bearer ${adminAccessToken}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });

    it('should return Ok when update a quiz', async () => {
        const res = await request(app)
            .put('/api/quiz/622e7790d66360235541d2f7')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send({
                name: 'quiz updated',
                description: 'description updated',
                category: 'category updated'
            });
        expect(res.statusCode).toBe(httpCode.OK);
        expect(res.body.quiz.name).toBe('quiz updated');
    });
});
