/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: '@shelf/jest-mongodb',
    roots: ['<rootDir>/src/tests'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    setupFiles: ['dotenv/config'],
    restoreMocks: true,
    resetMocks: true,
    clearMocks: true
};
