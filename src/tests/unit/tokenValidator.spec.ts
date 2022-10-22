import tokenValidator from '../../utils/validators/token-validator';

const mock = {
    userId: '507f1f77bcf86cd799439011',
    token: 'asdasdasd',
    password: '123456'
};

const invalidMock = {
    userId: '507f1f77bcf86cd799439011',
    token: 'asdasdasd',
    password: '12345'
};

describe('Token validator', () => {
    it('should return valid', async () => {
        const res = await tokenValidator(
            mock.userId,
            mock.password,
            mock.token
        );
        expect(res).toBe(true);
    });
    it('should throw invalid password if use password dont have 6 or more characters', async () => {
        await expect(
            tokenValidator(
                invalidMock.userId,
                invalidMock.password,
                invalidMock.token
            )
        ).rejects.toThrow('Password must be longer than 6 characters');
    });

    it('should throw Token is required', async () => {
        await expect(
            tokenValidator(invalidMock.userId, invalidMock.password, '')
        ).rejects.toThrow('Token is required');
    });
});
