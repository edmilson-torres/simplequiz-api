import express from 'express';

import quiz from './quiz-route';
import auth from './auth-route';
import user from './user-route';
import rateLimitMiddleware from '../middlewares/rateLimit-middleware';

const router = express.Router();

router.use(
    rateLimitMiddleware({
        requestWindowInSeconds: 30,
        maxConnections: 10
    })
);

router.use(auth);
router.use(quiz);
router.use(user);

export default router;
