module.exports = {
    verbose: false, // switch to true if needed
    preset: "ts-jest",
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["js", "jsx", "json", "node", "ts", "tsx"],
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
    moduleNameMapper: {
        // Handle module aliases (if you are using them in your webpack config)
        "^components/(.*)$": "<rootDir>/src/components/$1"
    },
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/", "!<rootDir>/path/to/dir/"],
    coveragePathIgnorePatterns: ["node_modules"],
    // coverage threshold values taken from https://git.geotab.com/dev/Development/-/blob/main/Checkmate/CheckmateServer/src/wwwroot/jest.config.js
    coverageThreshold: {
        global: {
            statements: 34,
            branches: 24,
            functions: 33,
            lines: 34
        }
    },
    coverageReporters: ["text"],
    globals: {
        "ts-jest": {
            tsconfig: "<rootDir>/tsconfig.json"
        }
    }
};
