const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^components/(.*)$': '<rootDir>/src/components/$1',
    '^utils/(.*)$': '<rootDir>/src/utils/$1',
  },

  collectCoverageFrom: [
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/utils/**/*.{js,jsx,ts,tsx}',
    'src/hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],

  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],

  transformIgnorePatterns: ['/node_modules/(?!(react-chartjs-2|chart.js|date-fns)/)'],
};

module.exports = createJestConfig(customJestConfig);
