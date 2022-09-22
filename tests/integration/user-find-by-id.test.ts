import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';

describe('Integration User find by id', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });
    afterEach(() => jest.clearAllMocks());

    it('should find users by id using admin role', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should return 401 without token', async () => {
        const res = await request(app).get('/api/users').send();
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe('token is missing');
    });

    it('should return 403 without admin role', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(403);
        expect(res.body.error).toBe('forbidden');
    });
});
