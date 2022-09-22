import type { Config } from '@jest/types'
import { join } from 'path';
export default async (): Promise<Config.InitialOptions> => {
  return {
    verbose: true,
    testEnvironment: 'jsdom',
    "setupFiles": [
      "fake-indexeddb/auto"
    ],
    // moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // transform: {
    //   '^.+\\.(ts|tsx)$': 'ts-jest',
    // },
    // testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^~/(.*)$': '<rootDir>/src/$1',
      '^vendor/(.*)$': '<rootDir>/vendor/$1',
    },
    // globals: {
    //   'ts-jest': {
    //     tsConfig: '<rootDir>/tsconfig.json',
    //   },
    // },
    // roots: ['<rootdir>/src'], // 查找src目录中的文件
    collectCoverage: true, // 统计覆盖率
    coverageDirectory: 'coverage', // 覆盖率结果输出的文件夹
    coverageThreshold: {
      // 所有文件总的覆盖率要求
      global: {
        branches: 60,
        functions: 60,
        lines: 60,
        statements: 60,
      },
      // 匹配到的单个文件的覆盖率要求
      // 这里也支持通配符的配置
      './src/**/*.{ts,tsx}': {
        branches: 40,
        functions: 40,
        lines: 40,
        statements: 40,
      },
    },
    // 匹配单测用例的文件
    // testMatch: ['<rootdir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}', '<rootdir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'],
    // // 设置别名，若不设置，运行单测时会不认识@符号
    // collectCoverageFrom: ['!src/**/*.d.ts', '!src/**/*{.json,.snap,.less,.scss}'],
  }



}