import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  name: string;

  @prop({ required: true, lowercase: true, unique: true })
  email: string;

  @prop({ default: 'user' })
  role: string;

  @prop({ required: true })
  password: string;

  @prop({ default: new Date().toISOString() })
  createAt: Date;
}
const UserModel = getModelForClass(User);

export default UserModel;
