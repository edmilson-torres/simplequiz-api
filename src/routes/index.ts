import express from 'express';
import quiz from './quiz';
import auth from './auth';
import user from './user';

const router = express.Router();

router.use(quiz);
router.use(auth);
router.use(user);

export default router;
