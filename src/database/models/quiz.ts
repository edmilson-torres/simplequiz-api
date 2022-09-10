import {
    prop,
    getModelForClass,
    modelOptions,
    Severity
} from '@typegoose/typegoose';

@modelOptions({ options: { allowMixed: Severity.ALLOW } })
class Question {
    @prop({ required: true, minlength: 2, maxlength: 250 })
    question: string;

    @prop({ required: true, minlength: 2, maxlength: 250 })
    answer: string;

    @prop({
        required: true,
        validate: [(val: string[]) => val.length === 3, 'need min 3 options']
    })
    options: string[];
}

export class Quiz {
    @prop({ required: true, minlength: 2, maxlength: 250 })
    name: string;

    @prop({
        required: true,
        minlength: 2,
        maxlength: 250
    })
    description: string;

    @prop({
        required: true,
        minlength: 2,
        maxlength: 80
    })
    category: string;

    @prop({ required: true, min: 2 })
    length: number;

    @prop({ required: true, type: () => [Question] })
    questions: Question[];

    @prop({ default: new Date().toISOString() })
    createAt: Date;
}

export const QuizModel = getModelForClass(Quiz);
