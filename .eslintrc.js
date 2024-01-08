module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser for TypeScript
    extends: [
      'react-app', // Uses the recommended rules from create-react-app
      'react-app/jest',
      'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
      'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
      'plugin:react-hooks/recommended', // Uses the recommended rules from @eslint-plugin-react-hooks
    ],
    plugins: [
      '@typescript-eslint', // Uses the plugin for TypeScript
      'react', // Uses the plugin for React
      'react-hooks', // Uses the plugin for React hooks
    ],
    parserOptions: {
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
      },
      project: './tsconfig.json', // Path to tsconfig.json, adjust if your file is located elsewhere
    },
    rules: {
      // Add custom rules or override defaults here
      // Example rule: Turn off explicit-function-return-type rule
      '@typescript-eslint/explicit-function-return-type': 'off',
  
      // Example rule: Enforce the use of '===' instead of '=='
      'eqeqeq': ['error', 'always'],
  
      // Add more custom rules as needed
    },
    settings: {
      react: {
        version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
      },
    },
  };