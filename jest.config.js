module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': ['ts-jest', {
      tsconfig: './tsconfig.spec.json',
    }],
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.spec.json',
    },
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/dist/**',
    '!**/main.ts',
    '!**/*.module.ts',
    '!**/*.spec.ts',
    '!**/*.e2e-spec.ts',
    '!**/app.module.ts',
    '!**/database/database.module.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
