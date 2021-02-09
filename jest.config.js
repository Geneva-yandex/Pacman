module.exports = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|svg|ttf)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    setupFilesAfterEnv: [
        '<rootDir>/tests/setupTests.ts'
    ]
};
