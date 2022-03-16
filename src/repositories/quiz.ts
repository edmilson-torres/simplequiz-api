import QuizListModel from '../database/models/quizList';
import QuizModel, { Quiz } from '../database/models/quiz';

class QuizRepository {
  public async findQuizById(id: string): Promise<Quiz | null> {
    const quiz = await QuizModel.findById(id);
    return quiz;
  }

  public async findQuizList(): Promise<Object> {
    const quizList = await QuizListModel.find({});
    return quizList;
  }
}

export default new QuizRepository();
