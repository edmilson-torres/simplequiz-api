import { signJwt, verifyJwt } from '../../src/libs/jwt';

const payload = {
    sub: '507f1f77bcf86cd799439011',
    role: 'user'
};
const token = signJwt(payload);

describe('JWT', () => {
    it('should create a jwt', () => {
        expect(token).toMatch(
            /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-\+\/=]*)/gi
        );
    });
    it('should verify a jwt', () => {
        const decoded = verifyJwt(token);
        expect(decoded).toHaveProperty('role', 'user');
        expect(decoded).toHaveProperty('sub', '507f1f77bcf86cd799439011');
    });
});
