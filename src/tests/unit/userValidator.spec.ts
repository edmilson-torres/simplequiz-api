import registerValidator from '@/utils/userValidator';

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
        const res = await registerValidator(mock);
        expect(res).toBe(true);
    });
    it('should return invalid', async () => {
        await expect(registerValidator(invalidMock)).rejects.toThrow();
    });
});
