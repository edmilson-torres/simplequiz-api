import emailValidator from '../../utils/validators/email-validator';

describe('emailValidator', () => {
    it('should return true for a valid email address', async () => {
        const result = await emailValidator('test@example.com');
        expect(result).toBeTruthy();
    });

    it('should throw an error for an invalid email address', async () => {
        await expect(emailValidator('invalid-email')).rejects.toThrow(
            'Must be a valid email'
        );
    });

    it('should throw an error when email is not provided', async () => {
        await expect(emailValidator(null)).rejects.toThrow('Email is required');
    });
});
