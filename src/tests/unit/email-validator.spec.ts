import emailValidator from '../../utils/validators/email-validator';

describe('emailValidator', () => {
    describe('Valid emails', () => {
        const validEmails = [
            'test@example.com',
            'user.name@example.com',
            'user+tag@example.com',
            'user@subdomain.example.com',
            'user@example.co.uk',
            'user-name@example.com',
            '1234567890@example.com',
            '_______@example.com'
        ];

        it.each(validEmails)('should return true for valid email: %s', async (email) => {
            expect(await emailValidator(email)).toBe(true);
        });
    });

    describe('Invalid email formats', () => {
        const invalidEmails = [
            'invalid-email',
            'plainaddress',
            '@no-local-part.com',
            'Outlook Contact <outlook-contact@domain.com>',
            'no-at.domain.com',
            'user@domain..com',
            '   ',
            'test@',
            '',
            undefined,
            null,
            123456,
            true,
            false,
            { email: 'test@example.com' },
            [],
            {}
        ];

        it.each(invalidEmails)('should throw an error for invalid email format: %s', async (email) => {
            await expect(emailValidator(email)).rejects.toThrow();
        });
    });
});
