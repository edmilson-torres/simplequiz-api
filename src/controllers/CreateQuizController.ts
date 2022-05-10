import { Request, Response } from 'express';

import CreateQuizService from '../services/CreateQuizService';

const createQuizService = new CreateQuizService();

class CreateQuizController {
  async handle(req: Request, res: Response) {
    try {
      const quizCreated = await createQuizService.execute(req.body);

      return res
        .status(201)
        .json({ message: 'quiz created', quiz: quizCreated });
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
}

export default CreateQuizController;
