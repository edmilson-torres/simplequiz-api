import { prop, getModelForClass, mongoose } from '@typegoose/typegoose';

export class QuizList {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  category: string;

  @prop({ required: true })
  length: number;

  @prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz',
    required: true
  })
  public quizId: string;
}
const QuizListModel = getModelForClass(QuizList);

export default QuizListModel;
