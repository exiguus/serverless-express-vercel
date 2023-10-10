import {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-babel',
  verbose: true,
  roots: ['<rootDir>'],
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'json'],
  testMatch: ['**/?(*.)+(spec|test|contract).[tj]s'],
  testPathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vercel|.vscode|coverage|data|dist)[/\\\\]',
  ],
  coveragePathIgnorePatterns: [
    '[/\\\\](node_modules|.cache|.vercel|.vscode|coverage|test|mocks|data|dist)[/\\\\]',
  ],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.ts$'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};

export default config;
