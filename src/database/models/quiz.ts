import { prop, getModelForClass } from '@typegoose/typegoose';

class Question {
  @prop({ required: true })
  public question: string;

  @prop({ required: true })
  public answer: string;

  @prop({ required: true })
  public options: Array<string>;
}

export class Quiz {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public category: string;

  @prop({ required: true })
  public length: number;

  @prop({ required: true, type: () => [Question] })
  public questions: Question[];

  @prop({ default: new Date().toISOString() })
  public createAt: Date;
}

export const QuizModel = getModelForClass(Quiz);
