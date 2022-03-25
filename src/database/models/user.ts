import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({
    required: true,
    minlength: [2, 'too short'],
    maxlength: [250, 'too long'],
    trim: true
  })
  name: string;

  @prop({
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
}
const UserModel = getModelForClass(User);

export default UserModel;
