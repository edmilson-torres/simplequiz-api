import request from 'supertest';
import app from '../../src/app';

import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';
import { httpCode } from '../../src/utils/httpCode';

describe('Integration User find by id', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });
    afterEach(() => jest.clearAllMocks());

    it('should return 401 without token', async () => {
        const res = await request(app)
            .get('/api/users/632616df38b680c9ad0d4c88')
            .send();
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
        expect(res.body.error).toBe('token is missing');
    });

    it('should return unauthorized without admin role', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users/632616d05b383a5cf6200420')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
        expect(res.body.error).toBe('unauthorized');
    });

    it('should return user not found', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users/632fc2e0936206d6fcfeb5eb')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });

    it('should return your own profile', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.OK);
    });

    it('should find user by id using admin role', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.OK);
    });
});
