module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|svg|ttf)$': '<rootDir>/mocks/fileMock.js',
        '\\.(scss)$': '<rootDir>/mocks/styleMock.js'
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupTests.ts'
    ]
};
