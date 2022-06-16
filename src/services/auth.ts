import UserRepository from '../repositories/user';
import { compareStringHash } from '../utils/hash';
import { signJwt } from '../utils/jwt';

class AuthService {
    static async login(email: string, password: string) {
        const user = await UserRepository.findUserByEmail(email);
        if (!user) {
            return false;
        }
        const passwordIsValid = await compareStringHash(
            password,
            user.password
        );
        if (!passwordIsValid) {
            return false;
        }

        try {
            const payload: Object = { sub: user._id, role: user.role };
            const token = signJwt(payload, {
                expiresIn: `${process.env.NODE_ENV === 'dev' ? '180m' : '5m'}`
            });
            return {
                id: user._id,
                name: user.name,
                email: user.email,
                token: token
            };
        } catch (err) {
            throw new Error('server error');
        }
    }
}

export default AuthService;
