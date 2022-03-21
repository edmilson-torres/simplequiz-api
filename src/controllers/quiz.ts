import { Request, Response } from 'express';

import { QuizModel } from '../database/models/quiz';
import QuizRepository from '../repositories/quiz';

class QuizController {
  public async createQuiz(req: Request, res: Response) {
    try {
      const { name, description, category, questions } = req.body;

      const questionsLength = questions.length;

      const quizModel = new QuizModel({
        category,
        name,
        description,
        questions,
        length: questionsLength
      });

      const quizCreated = await QuizRepository.createQuiz(quizModel);

      console.log(quizCreated._id);
      res.status(201).json({ message: 'quiz created' });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409);
        throw new Error('account already exists');
      }
      res.status(400);
      throw new Error('bad request');
    }
  }

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

  public async deletequiz(req: Request, res: Response) {
    const { id } = req.params;
    const quiz = await QuizRepository.findQuizById(id);

    if (!quiz) {
      res.status(422);
      throw new Error('quiz not found');
    }

    try {
      await QuizRepository.deleteQuiz(id);
      res.json({ message: 'resource deleted successfully' });
    } catch (err) {
      res.status(500);
      throw new Error('server error');
    }
  }
}

export default QuizController;
