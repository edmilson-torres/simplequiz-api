import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import { httpCode } from '../../src/utils/httpCode';

describe('Validate token middleware', () => {
    afterAll((done) => mongoose.disconnect(done));

    it('should return a error on invalid token verify', async () => {
        // const verifyJwt = jest.fn();
        // verifyJwt.mockReturnValue(false);
        const res = await request(app)
            .get('/api/users')
            .set('Authorization', `Bearer test`);
        expect(res.statusCode).toBe(httpCode.UNAUTHORIZED);
        expect(res.body.error).toBe('token is wrong');
    });
});
