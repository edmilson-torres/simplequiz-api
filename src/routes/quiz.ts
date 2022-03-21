import { Router } from 'express';

import validateToken from '../middlewares/validateToken';
import QuizController from '../controllers/quiz';

const router = Router();
const quizController = new QuizController();

router.post('/quiz/', validateToken, quizController.createQuiz);
router.get('/quizzes', validateToken, quizController.findQuizList);
router.get('/quiz/:id', validateToken, quizController.findQuiz);
router.delete('/quiz/:id', validateToken, quizController.deletequiz);

export default router;
