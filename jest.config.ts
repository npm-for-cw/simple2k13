import type { Config } from '@jest/types'
import { join } from 'path';
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    "setupFiles": [
      "fake-indexeddb/auto"
    ]
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // transform: {
    //   '^.+\\.(ts|tsx)$': 'ts-jest',
    // },
    // testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    // moduleNameMapper: {
    //   '^@/(.*)$': '<rootDir>/src/$1',
    //   '^~/(.*)$': '<rootDir>/src/$1',
    //   '^vendor/(.*)$': '<rootDir>/vendor/$1',
    // },
    // globals: {
    //   'ts-jest': {
    //     tsConfig: '<rootDir>/tsconfig.json',
    //   },
    // },
  }
    


}