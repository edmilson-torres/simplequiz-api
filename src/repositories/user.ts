import UserModel, { User } from '@/database/models/user';

class UserRepository {
  findUserById(id: string) {
    return UserModel.findById(id);
  }

  findUserList() {
    return UserModel.find({});
  }

  createUser(user: User) {
    return UserModel.create(user);
  }

  deleteUser(id: string) {
    return UserModel.deleteOne({ _id: id });
  }
}

export default new UserRepository();
