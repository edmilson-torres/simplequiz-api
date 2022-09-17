import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';
import { quizzies } from '../mock/quizzies';

describe('Integration Auth register', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
        await QuizModel.insertMany(quizzies);
    });
    afterAll(async () => {
        await QuizModel.deleteMany();
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'test',
            email: 'new.user@mail.com',
            password: '123456'
        });
        expect(res.statusCode).toBe(201);
    });

    it('should not register a user with wrong password', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'test',
            email: 'test@mail.com',
            password: '12345'
        });
        expect(res.statusCode).toBe(400);
    });

    it('should not register a existing user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'test',
            email: 'test@mail.com',
            password: '123456'
        });
        expect(res.statusCode).toBe(409);
    });
});
