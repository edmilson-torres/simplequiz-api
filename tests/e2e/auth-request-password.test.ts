import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';
import * as sendTestEmail from '../../src/utils/email/sendTestMail';

describe('E2E Auth request reset password', () => {
    afterAll((done) => {
        mongoose.disconnect(done);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return a reset link', async () => {
        const spy = jest
            .spyOn(sendTestEmail, 'sendTestEmail')
            .mockResolvedValue('string');
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'test@mail.com' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('link');
        expect(res.body.link).toBe('string');
        expect(spy).toBeCalledTimes(1);
    });
    it('should return not e-mail registered ', async () => {
        const res = await request(app)
            .post('/api/auth/requestresetpassword')
            .send({ email: 'nor.registered.email@mail.com' });
        expect(res.statusCode).toBe(404);
    });
});
