import Quiz from '../entities/quiz';
import { QuizModel } from '../database/models/quiz';

class QuizRepository {
    public async createQuiz(quiz: Quiz) {
        return QuizModel.create(quiz);
    }

    public async updateQuiz(id: string, quiz: Quiz): Promise<Quiz | null> {
        return QuizModel.findByIdAndUpdate({ _id: id }, quiz, {
            new: true
        });
    }

    public async findQuizById(id: string) {
        return QuizModel.findById(id).lean();
    }

    public async findQuizList() {
        return QuizModel.find({}, '-questions').lean();
    }

    public async deleteQuiz(id: string) {
        return QuizModel.deleteOne({ _id: id });
    }
}

export default new QuizRepository();
