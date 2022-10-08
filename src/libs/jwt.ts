import jwt from 'jsonwebtoken';
import env from '../config/env';

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    const secret = String(env.secretJWT);
    const token = jwt.sign(object, secret, {
        ...(options && options),
        algorithm: 'HS256'
    });

    return token;
}

export function verifyJwt(token: string) {
    const secret = String(env.secretJWT);

    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        return null;
    }
}
