import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';

describe('E2E Auth request reset password', () => {
    afterAll((done) => {
        mongoose.disconnect(done);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return a reset link', async () => {
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'test@mail.com' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('link');
    });
    it('should return not e-mail registered ', async () => {
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'nor.registered.email@mail.com' });
        expect(res.statusCode).toBe(404);
    });
});
