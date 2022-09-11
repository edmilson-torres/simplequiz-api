import tokenValidator from '../../src/utils/tokenValidator';

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
    it('should return a valid', async () => {
        const res = await tokenValidator(
            mock.userId,
            mock.password,
            mock.token
        );
        expect(res).toBe(true);
    });
    it('should return invalid password', async () => {
        await expect(
            tokenValidator(
                invalidMock.userId,
                invalidMock.password,
                invalidMock.token
            )
        ).rejects.toThrow();
    });
});
