import app from '../../app';
import request from 'supertest';
import { mongoose } from '@typegoose/typegoose';

describe('Ratelimit', () => {
    afterAll(() => mongoose.disconnect());

    it('should ensure the rate limit is used', async () => {
        const response = await request(app).get('/api/users');
        expect(response.headers).toHaveProperty('x-ratelimit-limit');
    });

    it('should return error 429 too many requests', async () => {
        let response = await request(app).get('/api/users');
        const maxAttemps = response.headers['x-ratelimit-limit'];
        for (let i = maxAttemps; i > 0; i--) {
            response = await request(app).get('/api/users');
        }
        expect(response.statusCode).toBe(429);
    });
});
