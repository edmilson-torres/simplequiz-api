import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';

describe('E2E Quiz create', () => {
    afterAll((done) => {
        mongoose.disconnect(done);
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return all quizzies', async () => {
        const login = await request(app).post('/api/auth/login').send({
            email: 'test@mail.com',
            password: '123456'
        });
        const res = await request(app)
            .get('/api/quiz')
            .set('Authorization', `Bearer ${login.body.user.token}`);
        expect(res.statusCode).toBe(200);
    });
});
