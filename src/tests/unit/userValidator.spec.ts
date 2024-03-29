import userRegisterValidator from '../../utils/validators/userRegister-validator';

const mock = {
    name: 'Edmilson',
    email: 'edmilson@email.com',
    role: 'user',
    password: '123456'
};

const invalidMock = {
    name: 'Edmilson',
    email: 'edmilson@email.com',
    role: 'user',
    password: '12345'
};

describe('User validator', () => {
    it('should return valid', async () => {
        const res = await userRegisterValidator(mock);
        expect(res).toBe(true);
    });
    it('should return invalid', async () => {
        await expect(userRegisterValidator(invalidMock)).rejects.toThrow();
    });
});
