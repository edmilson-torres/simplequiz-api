import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import QuizController from '../controllers/quiz';
import roleCheck from '../middlewares/roleCheck';

const router = Router();
const quizController = new QuizController();

router.post('/quiz', validateToken, quizController.createQuiz);
router.get('/quiz', validateToken, quizController.findQuizList);
router.get('/quiz/:id', validateToken, quizController.findQuiz);
router.delete(
  '/quiz/:id',
  validateToken,
  roleCheck(['admin']),
  quizController.deletequiz
);

export default router;
