import { Request, Response } from 'express';
import QuizListModel from '../database/models/quizList';
import QuizModel from '../database/models/quiz';

class QuizController {
  public async quiz(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const quiz = await QuizModel.findById(id);
      res.json(quiz);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }

  public async quizList(req: Request, res: Response): Promise<void> {
    try {
      const quizList = await QuizListModel.find({});
      res.json(quizList);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }
}
export default QuizController;
