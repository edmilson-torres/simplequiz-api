import User from 'entities/user';

import UserRepository from '../repositories/user-repository';
import { createStringHash } from '../utils/hash';
import userRegisterValidator from '../utils/userRegisterValidator';
import userUpdateValidator from '../utils/userUpdateValidator';

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
        const res = await userRegisterValidator(user);
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

    static async updateUser(
        sub: string,
        role: string,
        id: string,
        requestName: string,
        requestRole?: string
    ) {
        await userUpdateValidator({ name: requestName, role: requestRole });
        try {
            if (sub === id) {
                return await UserRepository.updateUser(id, requestName);
            } else if (role === 'admin') {
                return await UserRepository.updateUser(
                    id,
                    requestName,
                    requestRole
                );
            }
        } catch (err) {
            throw new Error(err.message);
        }
    }
}

export default UserService;
