import request from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';
import UserModel from '../../database/models/user';
import { httpCode } from '../../utils/httpCode';
import { users } from '../mock/users';

describe('Integration Auth login', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    it('should sign in and return a token', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        expect(res.body.user).toHaveProperty('token');
    });

    it('should not sign in, invalid password', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '12345'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
    });

    it('should not sign in, missing user e-mail', async () => {
        const res = await request(app).post('/api/auth/login').send({
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(res.body.error).toBe('user or password missing');
    });

    it('should not sign in, user not registered', async () => {
        const res = await request(app).post('/api/auth/login').send({
            email: 'user-not-registered@mail.com',
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
    });
});
