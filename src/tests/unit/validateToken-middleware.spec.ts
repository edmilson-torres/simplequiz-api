import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { httpCode } from '../../utils/httpCode';

describe('Validate token middleware', () => {
    afterAll(() => mongoose.disconnect());

    it('should return a error on invalid token verify', async () => {
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer test`);
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
        expect(res.body.error).toBe('token is wrong');
    });
});
