import { Router } from 'express';
import rateLimitMiddleware from '../middlewares/rateLimit';
import QuizController from '../controllers/quiz';
import validateToken from '../middlewares/validateToken';
const router = Router();
const quizController = new QuizController();

router.get(
  '/quizzes',
  rateLimitMiddleware({
    requestWindowInSeconds: 30,
    maxConnections: 10
  }),
  validateToken,
  quizController.findQuizList
);
router.get(
  '/quiz/:id',
  rateLimitMiddleware({
    requestWindowInSeconds: 30,
    maxConnections: 10
  }),
  validateToken,
  quizController.findQuiz
);

export default router;
