import { Router, Response, Request } from 'express';
import QuizController from './controllers/quiz';

const router = Router();
const quiz = new QuizController();

router.get('/quizzes', quiz.quizList);
router.get('/quiz/:id', quiz.quiz);

router.get('/', (req: Request, res: Response) => res.json({ message: 'test' }));

export default router;
