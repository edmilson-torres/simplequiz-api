import Quiz from '../entities/quiz';
import { QuizModel } from '../database/models/quiz';
import QuizRepository from '../repositories/quiz-repository';
import { httpCode } from '../utils/httpCode';
import AppError from '../utils/appError';

class QuizService {
    static async create(quiz: Quiz) {
        try {
            const { category, name, description, questions } = quiz;

            const questionsLength: number = questions?.length;
            const quizModel = new QuizModel({
                category,
                name,
                description,
                questions,
                length: questionsLength
            });

            const quizCreated = await QuizRepository.createQuiz(quizModel);
            return quizCreated;
        } catch (err) {
            throw new AppError(err.message, httpCode.BAD_REQUEST);
        }
    }

    static async update(id: string, quiz: Quiz) {
        const { category, name, description, questions } = quiz;

        const length = questions?.length;

        const quizData: Quiz = {
            category: category,
            name: name,
            description: description,
            questions: questions,
            length: length
        };
        try {
            const quizUpdated = await QuizRepository.updateQuiz(id, quizData);
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
