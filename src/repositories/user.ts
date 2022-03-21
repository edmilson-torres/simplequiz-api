import UserModel, { User } from '../database/models/user';

class UserRepository {
  public async findUserById(id: string): Promise<User> {
    return await UserModel.findById(id, '-password');
  }

  public async findUserByEmail(email: string) {
    return await UserModel.findOne({ email: email });
  }

  public async findUserList(): Promise<Array<User>> {
    return await UserModel.find({});
  }

  public async createUser(user: User): Promise<User> {
    return await UserModel.create(user);
  }

  public async deleteUser(id: string): Promise<Object> {
    return await UserModel.deleteOne({ _id: id });
  }
}

export default new UserRepository();
