import Quiz from '../entities/quiz';
import QuizRepository from '../repositories/quiz-repository';
import AppError from '../utils/appError';
import { httpCode } from '../utils/httpCode';

class QuizService {
    static async create(quiz: Quiz) {
        try {
            quiz.length = quiz.questions?.length;

            const quizCreated = await QuizRepository.createQuiz(quiz);
            return quizCreated;
        } catch (err) {
            throw new AppError(err.message, httpCode.BAD_REQUEST);
        }
    }

    static async update(id: string, quiz: Quiz) {
        quiz.length = quiz.questions?.length;

        try {
            const quizUpdated = await QuizRepository.updateQuiz(id, quiz);
            if (!quizUpdated) {
                throw new AppError('not found', httpCode.NOT_FOUND);
            }
            return quizUpdated;
        } catch (err) {
            throw new AppError('not found', httpCode.NOT_FOUND);
        }
    }

    static async findQuiz(id: string) {
        try {
            const quiz = await QuizRepository.findQuizById(id);
            if (!quiz) {
                throw new AppError('not found', httpCode.NOT_FOUND);
            }
            return quiz;
        } catch (err) {
            throw new AppError('not found', httpCode.NOT_FOUND);
        }
    }

    static async findQuizList() {
        try {
            return await QuizRepository.findQuizList();
        } catch (err) {
            throw new AppError('not found', httpCode.NOT_FOUND);
        }
    }

    static async deleteQuiz(id: string) {
        try {
            await QuizRepository.deleteQuiz(id);
        } catch (err) {
            throw new AppError('not found', httpCode.NOT_FOUND);
        }
    }
}

export default QuizService;
