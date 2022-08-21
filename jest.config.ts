import type { Config } from '@jest/types'
import { join } from 'path';
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    rootDir: join(__dirname),
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
      "^@src(.*)$": "<rootDir>/src$1",
      // '^@/(.*)$': '<rootDir>/$1',
      '^~/(.*)$': '<rootDir>/$1'
    },
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    },
    collectCoverageFrom: [
      'src/**/*.ts',
    ]
  }
    


}