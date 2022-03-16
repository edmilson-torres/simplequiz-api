import express from 'express';
import quizRouter from './quiz';

const app = express();

app.use(quizRouter);

export default app;
