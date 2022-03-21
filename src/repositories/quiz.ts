import { Quiz, QuizModel } from '../database/models/quiz';

class QuizRepository {
  public async createQuiz(quiz: Quiz) {
    return await QuizModel.create(quiz);
  }

  public async findQuizById(id: string) {
    const quiz = await QuizModel.findById(id);
    return quiz;
  }

  public async findQuizList() {
    const quizList = await QuizModel.find({}, '-questions');
    return quizList;
  }

  public async deleteQuiz(id: string) {
    const deletedquiz = await QuizModel.deleteOne({ _id: id });
    return deletedquiz;
  }
}

export default new QuizRepository();
