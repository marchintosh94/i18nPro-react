import type { JestConfigWithTsJest } from 'ts-jest'

import { defaults as tsjPreset } from 'ts-jest/presets'

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  transform: {
    ...tsjPreset.transform
  },
  testEnvironment: 'jsdom',
  verbose: true
}

export default jestConfig
