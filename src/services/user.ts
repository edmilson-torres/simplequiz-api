import User from 'entities/user';
import userValidator from '../utils/userValidator';
import UserRepository from '../repositories/user';
import { createStringHash } from '../utils/hash';

class UserService {
    static async findUsers() {
        const users = await UserRepository.findUserList();
        return users;
    }

    static async findUserById(id: string) {
        const user = await UserRepository.findUserById(id);
        return user;
    }

    static async deleteUser(id: string) {
        await UserRepository.deleteUser(id);
    }

    static async createUser(user: User) {
        const validate = await userValidator(user);
        if (typeof validate === 'string' || false) {
            throw new Error(validate);
        }
        const { name, email, password } = user;
        const passwordHased = await createStringHash(password);
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
