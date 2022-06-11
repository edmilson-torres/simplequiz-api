import { prop, getModelForClass } from '@typegoose/typegoose';

class Question {
    @prop({ required: true, minlength: 2, maxlength: 250 })
    public question: string;

    @prop({ required: true, minlength: 2, maxlength: 250 })
    public answer: string;

    @prop({
        required: true,
        validate: [(val: string[]) => val.length === 3, 'need min 3 options']
    })
    public options: string[];
}

export class Quiz {
    @prop({ required: true, minlength: 2, maxlength: 250 })
    public name: string;

    @prop({
        required: true,
        minlength: 2,
        maxlength: 250
    })
    public description: string;

    @prop({
        required: true,
        minlength: 2,
        maxlength: 80
    })
    public category: string;

    @prop({ required: true, min: 2 })
    public length: number;

    @prop({ required: true, type: () => [Question] })
    public questions: Question[];

    @prop({ default: new Date().toISOString() })
    public createAt: Date;
}

export const QuizModel = getModelForClass(Quiz);
