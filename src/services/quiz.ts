import Quiz from 'entities/quiz';

import { QuizModel } from '../database/models/quiz';
import QuizRepository from '../repositories/quiz';

class QuizService {
    static async create(quiz: Quiz) {
        const { category, name, description, questions } = quiz;

        const questionsLength: number = questions.length;

        const quizModel = new QuizModel({
            category,
            name,
            description,
            questions,
            length: questionsLength
        });

        const quizCreated = await QuizRepository.createQuiz(quizModel);

        return quizCreated;
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

        const quizUpdated = await QuizRepository.updateQuiz(id, quizData);

        return quizUpdated;
    }

    static async findQuiz(id: string) {
        const quiz = await QuizRepository.findQuizById(id);
        return quiz;
    }

    static async findQuizList() {
        const quizList = await QuizRepository.findQuizList();
        return quizList;
    }

    static async deleteQuiz(id: string) {
        await QuizRepository.deleteQuiz(id);
    }
}

export default QuizService;
