const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "@shelf/jest-mongodb",
  moduleNameMapper: {
    "^@/public/(.*)$": "<rootDir>/public/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/types/(.*)$": "<rootDir>/types/$1",
    "^@/src/(.*)$": "<rootDir>/src/$1",
    "^@/__tests__/(.*)$": "<rootDir>/__tests__/$1",
    "^@/__mocks__/(.*)$": "<rootDir>/__mocks__/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  watchPathIgnorePatterns: ["node_modules", "globalConfig"],
  // testTimeout: 15000,
};

const jestConfig = async () => {
  return await createJestConfig(customJestConfig)();
};

module.exports = jestConfig;
