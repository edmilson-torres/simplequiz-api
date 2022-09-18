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
    it.skip('should find user by id', async () => {
        const res = await request(app).get('/api/users').send();
        expect(res.statusCode).toBe(200);
    });
    it('should return 401 without admin role', async () => {
        const res = await request(app).get('/api/users').send();
        expect(res.statusCode).toBe(401);
    });
});
