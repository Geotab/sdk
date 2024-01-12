module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        projectFolderIgnoreList: ["node_modules"],
        createDefaultProgram: false,
        tsconfigRootDir: `${__dirname}`,
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    settings: {
        react: {
            createClass: "Component",
            version: "detect"
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off', 
        'react/no-unescaped-entities': 'off',
        "react-hooks/exhaustive-deps": "error",
        "react/prop-types": [
            2,
            {
                ignore: ["children"]
            }
        ],
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                "default": "array"
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            {
                "vars": "local",
                "argsIgnorePattern": "^_[1-9]?$",
                "args": "after-used",
                "ignoreRestSiblings": true,
                "caughtErrors": "none"
            }
        ],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/no-implied-eval": "off",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                "multiline": {
                    "delimiter": "semi",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                "default": [
                    "private-instance-field",
                    "private-static-field",
                    "private-instance-method",
                    "private-constructor",
                    "protected-instance-method",
                    "public-constructor",
                    "public-instance-field",
                    "public-instance-method",
                    "public-static-field",
                    "public-static-method"
                ]
            }
        ],
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/ban-types": [
            "error"
        ],
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/indent": ["off"],
        "@typescript-eslint/restrict-template-expressions": [
            "error",
            {
                allowNumber: true,
                allowBoolean: true,
                allowAny: false,
                allowNullish: false
            }
        ],
        "@typescript-eslint/no-empty-interface": [
            "error",
            {
                "allowSingleExtends": true
            }
        ],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                "checksVoidReturn": false,
                "checksConditionals": false
            }
        ],
        "@typescript-eslint/no-explicit-any": [
            "warn",   
            {
                "ignoreRestArgs": true,
                "fixToUnknown": false
            }
        ],
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/explicit-module-boundary-types": [
            "off",
            {
                "allowHigherOrderFunctions": false,
                "allowTypedFunctionExpressions": false,
                "allowDirectConstAssertionInArrowFunctions": false,
                "shouldTrackReferences": false
            }
        ],
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-readonly": "error",
        "quotes": "off",
        "@typescript-eslint/quotes": [
            "error",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "@typescript-eslint/restrict-plus-operands": "off",
        "semi": "off",
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "@typescript-eslint/unified-signatures": "off",   // change to warning
        "@typescript-eslint/no-var-requires": "off",    // change to warning
        "@typescript-eslint/prefer-regexp-exec": "off", // change to warning
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error"],
        "@typescript-eslint/no-extra-semi": "error",
        "@typescript-eslint/no-extra-parens": "off",
        "no-duplicate-imports": "off",
        "@typescript-eslint/no-duplicate-imports": "error",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error"],
        "brace-style": "off",
        "@typescript-eslint/brace-style": "off",
        "camelcase": [
            "error",
            {
                "properties": "never",
                "ignoreImports": true,
                "allow": []
            }
        ],
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": ["classMethod", "typeMethod", "typeProperty", "classProperty"],
                "format": ["camelCase"]
            },
            {
                "selector": ["class", "typeAlias", "typeParameter", "enum"],
                "format": ["PascalCase"]
            },
            // {
            //     "selector": "interface",
            //     "format": ["PascalCase"],
            //     "prefix": ["I"]
            // },
            {
                "selector": "function",
                "modifiers": ["exported"],
                "format": ["camelCase", "PascalCase"]
            },
            {
                "selector": "variable",
                "modifiers": ["const"],
                "format": ["UPPER_CASE", "camelCase"]
            },
            {
                "selector": "variableLike",
                "format": ["camelCase"],
                "leadingUnderscore": "allow"
            },
        ],
        "comma-dangle": "off",
        "@typescript-eslint/comma-dangle": ["error"],
        "default-param-last": "off",
        "@typescript-eslint/default-param-last": "off",
        "init-declarations": "off",
        "@typescript-eslint/init-declarations": "off", 
        "no-invalid-this": "off",
        "@typescript-eslint/no-invalid-this": "off",
        "no-loop-func": "off",
        "@typescript-eslint/no-loop-func": "error",
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-loss-of-precision": "off",
        "@typescript-eslint/no-loss-of-precision": ["error"],
        "require-await": "off",
        "@typescript-eslint/require-await": ["error"],
        "no-return-await": "off",
        "@typescript-eslint/return-await": ["error"],
        "@typescript-eslint/adjacent-overload-signatures": ["error"],
        "@typescript-eslint/array-type": ["error", { default: "array" }],
        "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "no-public" }],
        "@typescript-eslint/no-confusing-non-null-assertion": ["error"],
        "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true }],
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-extra-non-null-assertion": ["error"],
        "@typescript-eslint/no-non-null-asserted-optional-chain": ["error"],
        "@typescript-eslint/no-require-imports": ["error"],
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/no-unnecessary-type-constraint": ["error"],
        "@typescript-eslint/prefer-as-const": ["error"],
        "@typescript-eslint/prefer-literal-enum-member": ["error"],
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/switch-exhaustiveness-check": ["error"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                "ignoreTypeValueShadow": true,
                "ignoreFunctionTypeParameterNameValueShadow": true
            }
        ],
        "no-throw-literal": "off",
        "@typescript-eslint/no-throw-literal": "error",
        "no-array-constructor": "off",
        "@typescript-eslint/no-array-constructor": ["error"],
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-dupe-class-members": ["error"],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": ["error"],
        "no-unused-expressions": "off",
        "@typescript-eslint/no-unused-expressions": [
            "warn",
            {
                "allowShortCircuit": true,
                "allowTernary": true
            }
        ],
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": "off",
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": [
            "error",
            {
                "before": false,
                "after": true
            }
        ],
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": [
            "error",
            {
                "before": true,
                "after": true
            }
        ],
        "space-before-function-paren": "off", // decided 
        "@typescript-eslint/space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "ignore",
            "asyncArrow": "always"
        }],
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": ["error"],
        "array-bracket-spacing": [
            "error",
            "never",
            {
                "objectsInArrays": false,
                "arraysInArrays": false,
                "singleValue": false
            }
        ],
        "key-spacing": [
            "error",
            {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "computed-property-spacing": [
            "error",
            "never",
            {
                "enforceForClassMembers": true
            }
        ],
        "no-var": "off",
        "no-param-reassign": "error",
        "prefer-rest-params": "off",
        "prefer-spread": "off", 
        "prefer-object-spread": "error",
        "prefer-const": ["off", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }],
        "no-useless-rename": ["error"],
        "no-whitespace-before-property": "error",
        "space-unary-ops": "error",
        "template-curly-spacing": ["error", "never"],
        "template-tag-spacing": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "use-isnan": "error",
        "no-prototype-builtins": "off",
        "block-spacing": "error",
        "arrow-spacing": ["error", { "before": true, "after": true }],
        "no-trailing-spaces": "error",
        "no-underscore-dangle": [
            "error",
            {
                "enforceInMethodNames": false,
                "allow": ["__detach", "__showCrashElt", "__events", "_isEdited", "_createdDateTime", "_wfx_settings"]
            }
        ],
        "no-restricted-globals": [
            "error",
            "name",
            "length",
            "event",
            "parent"
        ],
        "no-unsafe-finally": "error",
        "no-empty-function": ["error", { "allow": ["arrowFunctions", "constructors", "getters", "setters", "methods"] }],
        "no-useless-escape": "warn",
        "complexity": [
            "error",
            {
                "max": 16
            }
        ],
        "no-useless-catch": "error",
        "no-extra-boolean-cast": ["error", { "enforceForLogicalOperands": true }],
        "constructor-super": "error",
        "consistent-return": "error",
        "curly": "error",
        "default-case": "error",
        "eqeqeq": [
            "error",
            "always"
        ],
        "id-blacklist": [
            "off",
            "any",
            "Number",
            "number",
            "String",
            "string",
            "Boolean",
            "boolean",
            "Undefined",
            "undefined"
        ],
        "indent": [
            "warn", 
            4,
            {
                "SwitchCase": 1,
                "FunctionDeclaration": { "body": 1, "parameters": 1 },
                "VariableDeclarator": 1,
                "MemberExpression": 1,
                "FunctionExpression": { "parameters": 1 },
                "CallExpression": { "arguments": 1 },
                "ArrayExpression": 1,
                "ObjectExpression": 1,
                "ImportDeclaration": 1,
                "flatTernaryExpressions": false,
                "offsetTernaryExpressions": false
            }
        ],
        "new-parens": "error",
        "arrow-body-style": ["error", "as-needed"],
        "id-match": "error",
        "max-classes-per-file": [
            "error",
            3
        ],
        "max-len": [
            "error",
            {
                "ignorePattern": "class [a-zA-Z]+ implements |^[\\s\\t]*\\/\\/|^[\\s\\t]*\\{|^[\\s\\t]*\"|^[\\s\\t]*\`|^[\\s\\t]*<|^[\\s\\t]*\\*|translate\\(",
                "code": 198
            }
        ],
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-empty": [
            "error",
            {
                "allowEmptyCatch": true
            }
        ],
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-irregular-whitespace": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                "max": 2
            }
        ],
        "no-case-declarations": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "off",
        "react/display-name": "off"
    },
    overrides: [
        {
            // Turning off max-len rule for static pages
            files: ["src/pages/**/*.js", "src/pages/**/*.jsx", "src/pages/**/*.ts", "src/pages/**/*.tsx"],
            rules: {
                "max-len": "off"
            }
        }
    ]
}