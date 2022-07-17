import { getModelForClass, prop } from '@typegoose/typegoose';

export class ResetPasswordToken {
    @prop({
        required: true,
        ref: 'user'
    })
    userId: string;

    @prop({
        required: true
    })
    token: string;

    @prop({
        required: true,
        default: Date.now,
        expires: 900
    })
    createAt: Date;
}

const ResetPasswordTokenModel = getModelForClass(ResetPasswordToken);

export default ResetPasswordTokenModel;
