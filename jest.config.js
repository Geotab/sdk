module.exports = {
    verbose: false, // switch to true if needed
    preset: "ts-jest",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: [ "js", "jsx", "json", "node", "ts", "tsx", ],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        // Handle module aliases (if you are using them in your webpack config)
        "^components/(.*)$": "<rootDir>/src/components/$1"
    },
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/index.tsx", // Exclude entry point if not testable
        // You can exclude other files or patterns as needed
    ],
    coveragePathIgnorePatterns: ["node_modules"],
    // taken from https://git.geotab.com/dev/Development/-/blob/main/Checkmate/CheckmateServer/src/wwwroot/jest.config.js
    coverageThreshold: {
        global: {
            statements: 34,
            branches: 24,
            functions: 33,
            lines: 34
        }
    },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.json',
        },
    },
};
