import { Request, Response } from 'express';

import { QuizModel } from '../database/models/quiz';
import QuizRepository from '../repositories/quiz';

class QuizController {
  public async createQuiz(req: Request, res: Response) {
    try {
      const { name, description, category, questions } = req.body;

      const questionsLength: number = questions.length;

      const quizModel = new QuizModel({
        category,
        name,
        description,
        questions,
        length: questionsLength
      });

      const quizCreated = await QuizRepository.createQuiz(quizModel);

      res.status(201).json({ message: 'quiz created', quiz: quizCreated });
    } catch (err) {
      if (err.code === 11000) {
        res.status(409);
        throw new Error('account already exists');
      } else {
        res.status(err.code);
        throw new Error(err.message);
      }
    }
  }

  public async updateQuiz(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id } = req.params;

      delete data.createAt;

      if (data.questions) {
        data.length = data.questions.length;
      }

      const quiz = await QuizRepository.updateQuiz(id, data);

      res.status(200).json({ message: 'quiz updated', quiz: quiz });
    } catch (err) {
      res.status(err.code);
      throw new Error(err.message);
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
