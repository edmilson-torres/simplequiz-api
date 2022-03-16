import { Request, Response } from 'express';
import QuizRepository from '../repositories/quiz';

class QuizController {
  public async findQuiz(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const quiz = await QuizRepository.findQuizById(id);
      res.json(quiz);
    } catch (err) {
      res.status(404);
      throw new Error('not found');
    }
  }

  public async findQuizList(req: Request, res: Response): Promise<void> {
    try {
      const quizList = await QuizRepository.findQuizList();
      res.json(quizList);
    } catch (err) {
      res.status(404);
      throw new Error('not found');
    }
  }
}
export default QuizController;
