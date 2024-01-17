module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    moduleNameMapper: {
        // Handle module aliases (if you are using them in your webpack config)
        "^components/(.*)$": "<rootDir>/src/components/$1"
    }
};
