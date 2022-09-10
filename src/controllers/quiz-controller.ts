import { NextFunction, Request, Response } from 'express';

import QuizService from '../services/quiz-service';
import { httpCode } from '../utils/httpCode';

class QuizController {
    public async createQuiz(req: Request, res: Response, next: NextFunction) {
        try {
            const quizCreated = await QuizService.create(req.body);
            return res
                .status(httpCode.CREATED)
                .json({ message: 'quiz created', quiz: quizCreated });
        } catch (err) {
            next(err);
        }
    }

    public async updateQuiz(req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const { id } = req.params;
            const quiz = await QuizService.update(id, data);
            res.status(httpCode.OK).json({
                message: 'quiz updated',
                quiz: quiz
            });
        } catch (err) {
            next(err);
        }
    }

    public async findQuiz(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const quiz = await QuizService.findQuiz(id);
            res.status(httpCode.OK).json(quiz);
        } catch (err) {
            next(err);
        }
    }

    public async findQuizList(req: Request, res: Response, next: NextFunction) {
        try {
            const quizList = await QuizService.findQuizList();
            res.status(httpCode.OK).json(quizList);
        } catch (err) {
            next(err);
        }
    }

    public async deletequiz(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            await QuizService.findQuiz(id);
        } catch (err) {
            next(err);
        }

        try {
            await QuizService.deleteQuiz(id);
            res.json({ message: 'resource deleted successfully' });
        } catch (err) {
            next(err);
        }
    }
}

export default QuizController;
