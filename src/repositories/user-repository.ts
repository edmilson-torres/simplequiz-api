import UserModel, { User } from '../database/models/user';

class UserRepository {
    public async findUserById(id: string): Promise<User> {
        return await UserModel.findById(id, '-password').lean();
    }

    public async findUserByEmail(email: string) {
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
            { new: true }
        );
    }

    public async updatePassword(userId: string, hash: string) {
        const user = UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { password: hash } },
            { new: true }
        );
        return user
    }

    public async deleteUser(id: string): Promise<Object> {
        return await UserModel.deleteOne({ _id: id });
    }
}

export default new UserRepository();
