import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';

describe('Integration Auth login', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
        await QuizModel.insertMany(quizzies);
    });
    afterAll(async () => {
        await QuizModel.deleteMany();
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should sign in an return a token', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        expect(res.body.user).toHaveProperty('token');
    });

    it('should not sign in, wrong password', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '12345'
        });
        expect(res.statusCode).toBe(400);
    });

    it('should not sign in, missing user e-mail', async () => {
        const res = await request(app).post('/api/auth/login').send({
            password: '123456'
        });
        expect(res.statusCode).toBe(400);
    });

    it('should not sign in, user not registered', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'user-not-registered@mail.com',
            password: '123456'
        });
        expect(res.statusCode).toBe(400);
    });
});
