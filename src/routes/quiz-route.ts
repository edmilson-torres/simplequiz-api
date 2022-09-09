import { Router } from 'express';

import validateToken from '../middlewares/validateToken-middleware';
import QuizController from '../controllers/quiz-controller';
import roleCheck from '../middlewares/role-check-middleware';

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
router.put(
    '/quiz/:id',
    validateToken,
    roleCheck(['admin']),
    quizController.updateQuiz
);

export default router;
