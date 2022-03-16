import { Router } from 'express';
import QuizController from '../controllers/quiz';

const quizRouter = Router();
const quizController = new QuizController();

quizRouter.get('/quizzes', quizController.findQuizList);
quizRouter.get('/quiz/:id', quizController.findQuiz);

export default quizRouter;
