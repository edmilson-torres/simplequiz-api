import Quiz from '../entities/quiz';
import { QuizModel } from '../database/models/quiz';

class QuizRepository {
    public async createQuiz(quiz: Quiz) {
        return await QuizModel.create(quiz);
    }

    public async updateQuiz(id: string, quiz: Quiz): Promise<Quiz | null> {
        const result: Quiz | null = await QuizModel.findByIdAndUpdate(
            { _id: id },
            quiz,
            {
                new: true
            }
        );
        return result;
    }

    public async findQuizById(id: string) {
        const quiz = await QuizModel.findById(id).lean();
        return quiz;
    }

    public async findQuizList() {
        const quizList = await QuizModel.find({}, '-questions').lean();
        return quizList;
    }

    public async deleteQuiz(id: string) {
        const deletedquiz = await QuizModel.deleteOne({ _id: id });
        return deletedquiz;
    }
}

export default new QuizRepository();
