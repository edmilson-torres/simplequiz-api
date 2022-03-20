import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import QuizController from '../controllers/quiz';

const router = Router();
const quizController = new QuizController();

router.get('/quizzes', validateToken, quizController.findQuizList);
router.get('/quiz/:id', validateToken, quizController.findQuiz);

export default router;
