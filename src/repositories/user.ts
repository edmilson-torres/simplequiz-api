import UserModel, { User } from '@/database/models/user';

class UserRepository {
  findUserById(id: string) {
    return UserModel.findById(id);
  }

  findUSerList() {
    return UserModel.find({});
  }

  createUser(user: User) {
    return UserModel.create(user);
  }

  findUserByEmail(email: string) {
    return UserModel.findOne({ email });
  }
}

export default new UserRepository();
