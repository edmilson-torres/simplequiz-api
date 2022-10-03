import request from 'supertest';
import app from '../../src/app';

import * as hash from '../../src/utils/hash';

import mongoose from 'mongoose';
import ResetPasswordTokenRepository from '../../src/repositories/token-repository';
import UserModel from '../../src/database/models/user';
import { users } from '../mock/users';
import { httpCode } from '../../src/utils/httpCode';

describe('Integration Auth reset password', () => {
    beforeAll(async () => {
        await UserModel.insertMany(users);
    });

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        await UserModel.deleteMany();
        await mongoose.disconnect();
    });

    afterEach(() => jest.clearAllMocks());

    it('should return 200 with a password reset successfully message', async () => {
        jest.spyOn(ResetPasswordTokenRepository, 'findById').mockResolvedValue({
            userId: '632616df38b680c9ad0d4c88',
            token: 'tokenUsingSpy'
        });
        const compareStringHashSpy = jest
            .spyOn(hash, 'compareStringHash')
            .mockResolvedValue(true);
        const res = await request(app).post('/api/auth/resetpassword').send({
            userId: '632616df38b680c9ad0d4c88',
            token: 'tokenUsingSpy',
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.OK);
        expect(res.body.message).toBe('password reset successfully');
        expect(compareStringHashSpy).toBeCalledTimes(1);
    });

    it('should return 400 for a not valid token', async () => {
        const res = await request(app).post('/api/auth/resetpassword').send({
            userId: '632616df38b680c9ad0d4c88',
            token: 'tokenUsingSpy',
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(res.body.error).toBe('invalid credentials');
    });

    it('should return 400 for a not valid user id', async () => {
        jest.spyOn(ResetPasswordTokenRepository, 'findById').mockResolvedValue(
            null
        );
        const res = await request(app).post('/api/auth/resetpassword').send({
            userId: '632616df38b680c9ad0d4c87',
            token: 'tokenUsingSpy',
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(res.body.error).toBe('invalid credentials');
    });

    it('should return 400 for missing credentials', async () => {
        const res = await request(app).post('/api/auth/resetpassword').send({
            userId: '123456',
            token: '123456',
            password: ''
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(res.body.error).toBe('missing credentials');
    });

    it('should return 400 for invalid id', async () => {
        const res = await request(app).post('/api/auth/resetpassword').send({
            userId: '632617f44be4d9b52988f3b2',
            token: '$2b$12$jpIaH5SP6J4rAkJfvGP4uOLnumzrF8sV2yYcy.zS0BpZPSv1oCKiq',
            password: '123456'
        });
        expect(res.statusCode).toBe(httpCode.BAD_REQUEST);
        expect(res.body.error).toBe('invalid credentials');
    });
});
