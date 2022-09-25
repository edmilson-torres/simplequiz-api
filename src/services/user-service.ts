import AppError from '../utils/appError';
import UserRepository from '../repositories/user-repository';
import { createStringHash } from '../utils/hash';
import userRegisterValidator from '../utils/userRegisterValidator';
import userUpdateValidator from '../utils/userUpdateValidator';
import { httpCode } from '../utils/httpCode';
import User from '../entities/user';

class UserService {
    static async findUsers() {
        const users = await UserRepository.findUserList();
        return users;
    }

    static async findUserById(id: string, sub: string, role: string) {
        try {
            await userUpdateValidator({ id: id });
            const user = await UserRepository.findUserById(id);
            if (!user) {
                throw new AppError('user not found', httpCode.NOT_FOUND);
            }
            if (role === 'admin' || sub === id) {
                return user;
            } else {
                throw new AppError('unauthorized', httpCode.UNAUTHORIZED);
            }
        } catch (err) {
            throw new AppError(err.message, err.statusCode);
        }
    }

    static async findUserByEmail(email: string) {
        const user = await UserRepository.findUserByEmail(email);
        return user;
    }

    static async deleteUser(id: string) {
        await userUpdateValidator({ id: id });
        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new AppError('invalid id', httpCode.NOT_FOUND);
        }
        await UserRepository.deleteUser(id);
    }

    static async createUser(user: User) {
        try {
            await userRegisterValidator(user);
        } catch (err) {
            throw new AppError(err.message, httpCode.BAD_REQUEST);
        }

        const { name, email, password } = user;

        try {
            const passwordHased = await createStringHash(password.toString());
            const userModel = {
                name,
                email,
                password: passwordHased
            };
            const result = await UserRepository.createUser(userModel);
            const id = result._id;
            return { name, email, id };
        } catch (err) {
            throw new AppError('account already exists', httpCode.CONFLICT);
        }
    }

    static async updateUser(
        sub: string,
        role: string,
        id: string,
        requestName: string,
        requestRole?: string
    ) {
        await userUpdateValidator({ id: id });

        const user = await UserRepository.findUserById(id);
        if (!user) {
            throw new AppError('user not found', httpCode.NOT_FOUND);
        }

        try {
            if (sub === id) {
                if (!requestName) {
                    throw new AppError(
                        'name is required',
                        httpCode.BAD_REQUEST
                    );
                }
                await userUpdateValidator({ name: requestName });
                return await UserRepository.updateUser(id, requestName);
            } else if (role === 'admin') {
                await userUpdateValidator({
                    name: requestName,
                    role: requestRole
                });
                return await UserRepository.updateUser(
                    id,
                    requestName,
                    requestRole
                );
            } else {
                throw new AppError(
                    'you can only update your profile',
                    httpCode.UNAUTHORIZED
                );
            }
        } catch (err) {
            throw new AppError(err.message, err.statusCode);
        }
    }
}

export default UserService;
