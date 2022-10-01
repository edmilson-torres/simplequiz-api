import request from 'supertest';
import app from '../../src/app';

import { httpCode } from '../../src/utils/httpCode';
import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';

let userAccessToken: string;
let adminAccessToken: string;

describe('Integration User delete', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
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
        const res = await request(app)
            .delete('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${userAccessToken}`);
        expect(res.statusCode).toBe(httpCode.FORBIDDEN);
    });

    it('should return user not found', async () => {
        const res = await request(app)
            .delete('/api/users/632fb514e7e90e4a4699a298')
            .set('Authorization', `Bearer ${adminAccessToken}`);
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });
    it('should delete user by id', async () => {
        const res = await request(app)
            .delete('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${adminAccessToken}`);
        expect(res.statusCode).toBe(204);
    });
});
