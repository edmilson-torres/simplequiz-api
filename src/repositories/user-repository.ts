import UserModel, { User } from '../database/models/user';

class UserRepository {
    public async findUserById(id: string): Promise<User> {
        return UserModel.findById(id, [
            '-createAt',
            '-password',
            '-__v'
        ]).lean();
    }

    public async findUserByEmail(email: string): Promise<User> {
        return UserModel.findOne({ email: email }).lean();
    }

    public async findUserList(): Promise<Array<User>> {
        return UserModel.find({}, '-password').lean();
    }

    public async createUser(user: Object) {
        return UserModel.create(user);
    }

    public async updateUser(
        id: string,
        name?: string,
        role?: string
    ): Promise<User> {
        return UserModel.findByIdAndUpdate(
            { _id: id },
            { name: name, role: role },
            { fields: { password: 0, __v: 0, createAt: 0 }, new: true }
        ).lean();
    }

    public async updatePassword(userId: string, hash: string): Promise<User> {
        return UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        ).lean();
    }

    public async deleteUser(id: string): Promise<Object> {
        return UserModel.deleteOne({ _id: id });
    }
}

export default new UserRepository();
