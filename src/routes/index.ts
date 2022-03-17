import express from 'express';
import quiz from './quiz';

const router = express.Router();

router.use(quiz);

export default router;
