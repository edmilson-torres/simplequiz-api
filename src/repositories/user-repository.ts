import UserModel, { User } from '../database/models/user';

class UserRepository {
    public async findUserById(id: string): Promise<User> {
        return await UserModel.findById(id, [
            '-createAt',
            '-password',
            '-__v'
        ]).lean();
    }

    public async findUserByEmail(email: string): Promise<string> {
        return await UserModel.findOne({ email: email }).lean();
    }

    public async findUserList(): Promise<Array<User>> {
        return await UserModel.find({}, '-password').lean();
    }

    public async createUser(user: Object) {
        return await UserModel.create(user);
    }

    public async updateUser(
        id: string,
        name?: string,
        role?: string
    ): Promise<User> {
        return await UserModel.findByIdAndUpdate(
            { _id: id },
            { name: name, role: role },
            { fields: { password: 0, __v: 0, createAt: 0 }, new: true }
        ).lean();
    }

    public async updatePassword(userId: string, hash: string) {
        const user = UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        );
        return user;
    }

    public async deleteUser(id: string): Promise<Object> {
        return await UserModel.deleteOne({ _id: id });
    }
}

export default new UserRepository();