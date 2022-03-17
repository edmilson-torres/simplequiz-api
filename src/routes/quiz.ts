import { Router } from 'express';
import QuizController from '../controllers/quiz';

const router = Router();
const quizController = new QuizController();

router.get('/quizzes', quizController.findQuizList);
router.get('/quiz/:id', quizController.findQuiz);

export default router;
