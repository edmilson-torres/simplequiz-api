import request from 'supertest';
import app from '../../src/app';

import { httpCode } from '../../src/utils/httpCode';
import mongoose from 'mongoose';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';

let userAccessToken: string;
let adminAccessToken: string;

describe('Integration User update', () => {
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

    beforeEach(() => {
        app.enable('trust proxy');
    });

    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    afterEach(() => jest.clearAllMocks());

    it('should return unauthorized, without token', async () => {
        const res = await request(app)
            .put('/api/users/632616df38b680c9ad0d4c88')
            .send({ name: 'testing rote' });
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return unauthorized, without admin role or your own profile', async () => {
        const res = await request(app)
            .put('/api/users/632616d05b383a5cf6200420')
            .set('Authorization', `Bearer ${userAccessToken}`)
            .send({ name: 'testing rote' });
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
    });

    it('should return user not found', async () => {
        const res = await request(app)
            .put('/api/users/632fb514e7e90e4a4699a298')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send({ name: 'testing rote' });
        expect(res.statusCode).toBe(httpCode.NOT_FOUND);
    });

    it('should return bad request, trying update without name param', async () => {
        const res = await request(app)
            .put('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${userAccessToken}`)
            .send({});
        expect(res.statusCode).toBe(400);
    });

    it('should update user by id using admin role', async () => {
        const res = await request(app)
            .put('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${adminAccessToken}`)
            .send({ name: 'testing rote' });
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('testing rote');
    });

    it('should update your own profile', async () => {
        const res = await request(app)
            .put('/api/users/632616df38b680c9ad0d4c88')
            .set('Authorization', `Bearer ${userAccessToken}`)
            .send({ name: 'testing update my own name' });

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('testing update my own name');
    });
});
