import request from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';
import UserModel from '../../database/models/user';
import QuizModel from '../../database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';
import { httpCode } from '../../utils/httpCode';

let userAccessToken: string;
let adminAccessToken: string;

describe('Integration Quiz find quiz', () => {
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
        const res = await request(app).get(
            '/api/quiz/622e7790d66360235541d2f7'
        );
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return not found if quiz not exist', async () => {
        const res = await request(app)
            .get('/api/quiz/622e7790d66360235541d2f6')
            .set('Authorization', `Bearer ${adminAccessToken}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });

    it('should find quiz by id', async () => {
        const res = await request(app)
            .get('/api/quiz/622e7790d66360235541d2f7')
            .set('Authorization', `Bearer ${adminAccessToken}`);
        expect(res.statusCode).toBe(httpCode.OK);
        expect(res.body._id).toBe('622e7790d66360235541d2f7');
    });
});
