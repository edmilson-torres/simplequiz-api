import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
    @prop({
        required: true,
        minlength: 2,
        maxlength: 250,
        trim: true
    })
    name: string;

    @prop({
        isEmail: true,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    })
    email: string;

    @prop({ default: 'user' })
    role: string;

    @prop({
        required: true,
        trim: true
    })
    password: string;

    @prop({
        default: new Date().toISOString()
    })
    createAt: Date;

    @prop()
    updateAt: Date;
}
const UserModel = getModelForClass(User);

export default UserModel;
