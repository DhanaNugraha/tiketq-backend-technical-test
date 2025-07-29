module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
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
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
