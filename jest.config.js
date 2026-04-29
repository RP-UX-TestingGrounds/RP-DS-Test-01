module.exports = {
  preset: 'ts-jest',
  testMatch: null,
  transform: {
    '\\.[t]sx?$': 'ts-jest',
    '\\.mjs$': ['babel-jest', { configFile: './.jest/babel.config.js' }],
    '\\.[j]sx?$': ['babel-jest', { configFile: './.jest/babel.config.js' }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(flatqueue|@mui/x-charts)/)',
  ],
  displayName: 'react',
  bail: false,
  verbose: true,
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  testRegex: 'src(/__tests__/.*|.+\\.(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: [
    '/node-modules/',
    '/.build/',
  ],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/.build/',
  ],
  // Mocking CSS-Modules here
  moduleNameMapper: {
    '\\.(css|scss|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: 'reports/coverage/react',
  coveragePathIgnorePatterns: [
    '.stories.js',
    '.stories.ts',
    '/stories/',
  ],
};
