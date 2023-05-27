import app from '../../app';
import request from 'supertest';
import mongoose from 'mongoose';

describe('CORS Middleware', () => {
    afterAll(() => mongoose.disconnect());
    test('Should enable CORS', async () => {
        app.get('/test_cors', (req, res) => {
            res.send();
        });
        await request(app)
            .get('/test_cors')
            .expect('access-control-allow-origin', '*');
    });
});
