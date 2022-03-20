import express from 'express';

import quiz from './quiz';
import auth from './auth';
import user from './user';
import rateLimitMiddleware from '../middlewares/rateLimit';

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
