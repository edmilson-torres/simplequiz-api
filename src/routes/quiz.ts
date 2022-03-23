import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import QuizController from '../controllers/quiz';
import isAdmin from '../middlewares/isAdmin';

const router = Router();
const quizController = new QuizController();

router.post('/quiz', validateToken, quizController.createQuiz);
router.get('/quiz', validateToken, quizController.findQuizList);
router.get('/quiz/:id', validateToken, quizController.findQuiz);
router.delete('/quiz/:id', validateToken, isAdmin, quizController.deletequiz);

export default router;
