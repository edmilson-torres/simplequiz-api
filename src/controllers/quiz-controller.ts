import { Request, Response } from 'express';

import QuizService from '../services/quiz-service';

class QuizController {
    public async createQuiz(req: Request, res: Response) {
        try {
            const quizCreated = await QuizService.create(req.body);

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

    public async updateQuiz(req: Request, res: Response) {
        try {
            const data = req.body;
            const { id } = req.params;

            const quiz = await QuizService.update(id, data);
            res.status(200).json({ message: 'quiz updated', quiz: quiz });
        } catch (err) {
            res.status(err.code);
            throw new Error(err.message);
        }
    }

    public async findQuiz(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const quiz = await QuizService.findQuiz(id);
            res.status(200).json(quiz);
        } catch (err) {
            res.status(404);
            throw new Error('not found');
        }
    }

    public async findQuizList(res: Response) {
        try {
            const quizList = await QuizService.findQuizList();
            res.json(quizList);
        } catch (err) {
            res.status(404);
            throw new Error('not found');
        }
    }

    public async deletequiz(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await QuizService.findQuiz(id);
        } catch (error) {
            res.status(422);
            throw new Error('quiz not found');
        }

        try {
            await QuizService.deleteQuiz(id);
            res.json({ message: 'resource deleted successfully' });
        } catch (err) {
            res.status(500);
            throw new Error('server error');
        }
    }
}

export default QuizController;
