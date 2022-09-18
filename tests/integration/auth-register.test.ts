import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';

describe('Integration Auth register', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll(async () => {
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
