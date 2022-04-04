import Quiz from 'entities/quiz';

import { QuizModel } from '../database/models/quiz';
import QuizRepository from '../repositories/quiz';

class CreateQuizService {
  static execute: any;
  async execute(quiz: Quiz) {
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
}

export default CreateQuizService;
