module.exports = {
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: 'jest-extended',
  collectCoverage: true,
  coverageReporters: ['text'],
  moduleNameMapper: {
    '@onetron/(.*)': '<rootDir>/packages/$1/src',
  },
  moduleFileExtensions: [
    'js',
    'ts',
    'json',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testMatch: [
    '<rootDir>/packages/**/*.spec.ts',
  ],
};