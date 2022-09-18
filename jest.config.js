/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: '@shelf/jest-mongodb',
    roots: ['<rootDir>/tests'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: 'coverage',
    coverageProvider: 'babel',
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    setupFiles: ['dotenv/config']
};
