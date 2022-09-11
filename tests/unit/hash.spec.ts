import { compareStringHash, createStringHash } from '../../src/utils/hash';

describe('Hash', () => {
    it('should create hash', async () => {
        expect(await createStringHash('123456')).toMatch(/^\$2[ayb]\$.{56}$/gm);
    });
    it('should compare hash return true', async () => {
        const hash = await createStringHash('123456');
        expect(await compareStringHash('123456', hash)).toBe(true);
    });
    it('should compare hash return false', async () => {
        const hash = await createStringHash('abcdef');
        expect(await compareStringHash('123456', hash)).toBe(false);
    });
});
