import User from 'entities/user';

import UserRepository from '../repositories/user-repository';
import { createStringHash } from '../utils/hash';
import userValidator from '../utils/userValidator';

class UserService {
    static async findUsers() {
        const users = await UserRepository.findUserList();
        return users;
    }

    static async findUserById(id: string) {
        const user = await UserRepository.findUserById(id);
        return user;
    }

    static async findUserByEmail(email: string) {
        const user = await UserRepository.findUserByEmail(email);
        return user;
    }

    static async deleteUser(id: string) {
        await UserRepository.deleteUser(id);
    }

    static async createUser(user: User) {
        const res = await userValidator(user);
        if (typeof res === 'string') {
            throw new Error(res);
        }
        const { name, email, password } = user;
        const passwordHased = await createStringHash(password.toString());
        const userModel = {
            name,
            email,
            password: passwordHased
        };
        const result = await UserRepository.createUser(userModel);
        const id = result._id;
        return { name, email, id };
    }

    static async updateUser(id: string, name: string, userRoles?: string) {
        const result = await UserRepository.updateUser(id, name, userRoles);
        return result;
    }
}

export default UserService;
