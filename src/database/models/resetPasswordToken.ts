import * as mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

export class ResetPasswordToken {
    @prop({
        required: true,
        ref: 'user'
    })
    userId: mongoose.Types.ObjectId;

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