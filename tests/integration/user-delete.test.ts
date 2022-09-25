import request from 'supertest';
import app from '../../src/app';

import { httpCode } from '../../src/utils/httpCode';
import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';

describe('Integration User delete', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });
    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });
    afterEach(() => jest.clearAllMocks());

    it('should return unauthorized, without token', async () => {
        const res = await request(app).delete(
            '/api/users/632616df38b680c9ad0d4c88'
        );
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return forbidden, without admin role', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .delete('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.FORBIDDEN);
    });

    it('should return user not found', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .delete('/api/users/632fb514e7e90e4a4699a298')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });
    it('should delete user by id', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'admin@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .delete('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(204);
    });
});
