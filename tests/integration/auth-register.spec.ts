import request from 'supertest';
import app from '../../src/app';
import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import QuizModel from '../../src/database/models/quiz';
import { users } from '../mock/users';

describe('Auth', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll((done) => {
        mongoose.disconnect(done);
    });

    it('should not register a user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            name: 'test',
            email: 'test.valido@mail.com',
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
