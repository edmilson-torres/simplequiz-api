import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';

class Question {
  @prop({ required: true })
  question: string;

  @prop({ required: true })
  answer: string;

  @prop({ required: true })
  options: Array<string>;
}

export class Quiz {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  category: string;

  @prop({ required: true, type: mongoose.Schema.Types.Mixed })
  questions: Array<Question>;
}
const QuizModel = getModelForClass(Quiz);

export default QuizModel;
