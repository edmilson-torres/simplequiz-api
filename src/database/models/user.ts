import { prop, getModelForClass } from '@typegoose/typegoose';

export class User {
  @prop({ required: true })
  name: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  role: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true })
  createAt: Date;
}
const UserModel = getModelForClass(User);

export default UserModel;
