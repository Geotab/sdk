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
        "plugin:prettier/recommended"
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
        'react/react-in-jsx-scope': 'off', // TODO: discuss if we need to turn this on and address the issue
        'react/no-unescaped-entities': 'off', // TODO: discuss if this should be turned on and address the issue
        "@typescript-eslint/adjacent-overload-signatures": "error",
        "@typescript-eslint/array-type": [
            "error",
            {
                default: "array"
            }
        ],
        "@typescript-eslint/await-thenable": "error",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                vars: "local",
                argsIgnorePattern: "^_[1-9]?$",
                args: "after-used",
                ignoreRestSiblings: true,
                caughtErrors: "none"
            }
        ],
        "@typescript-eslint/consistent-type-definitions": "error",
        "@typescript-eslint/no-implied-eval": "error",
        "@typescript-eslint/member-delimiter-style": [
            "error",
            {
                multiline: {
                    delimiter: "semi",
                    requireLast: true
                },
                singleline: {
                    delimiter: "semi",
                    requireLast: false
                }
            }
        ],
        "@typescript-eslint/member-ordering": [
            "error",
            {
                default: [
                    "signature",
                    "private-instance-field",
                    "private-static-field",
                    "private-instance-method",
                    "private-decorated-method",
                    "private-constructor",
                    "protected-instance-method",
                    "protected-abstract-method",
                    "protected-constructor",
                    "protected-abstract-method",
                    "public-constructor",
                    "public-instance-field",
                    "public-decorated-field",
                    "public-abstract-method",
                    "public-instance-method",
                    "public-decorated-method",
                    "public-static-field",
                    "public-static-method"
                ]
            }
        ],
        "@typescript-eslint/no-extraneous-class": "error",
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    Number: {
                        message: "Use number instead",
                        fixWith: "number"
                    },
                    Boolean: {
                        message: "Use boolean instead",
                        fixWith: "boolean"
                    },
                    String: {
                        message: "Use string instead",
                        fixWith: "string"
                    },
                    Array: {
                        message: "Use [] instead",
                        fixWith: "[]"
                    },
                    Function: {
                        message: "Use actual function type with arguments instead"
                    },
                    "{}": {
                        message: "Use object instead",
                        fixWith: "object"
                    }
                },
                extendDefaults: false
            }
        ],
        "@typescript-eslint/no-floating-promises": "off", // should be turned on
        "@typescript-eslint/no-for-in-array": "error",
        "@typescript-eslint/no-inferrable-types": "error",
        "@typescript-eslint/no-misused-new": "error",
        "@typescript-eslint/no-namespace": "error",
        "@typescript-eslint/no-non-null-assertion": "error",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-argument": "off", // change to error, it's very helpful
        "@typescript-eslint/restrict-template-expressions": [
            "error",
            {
                allowNumber: true,
                allowBoolean: true,
                allowAny: true, // chagne to 'false'
                allowNullish: false
            }
        ],
        "@typescript-eslint/no-empty-interface": [
            "error",
            {
                allowSingleExtends: true
            }
        ],
        "@typescript-eslint/no-misused-promises": [
            "error",
            {
                checksVoidReturn: false
            }
        ],
        "@typescript-eslint/no-explicit-any": [
            "off", // !!!change to error
            {
                ignoreRestArgs: true,
                fixToUnknown: false
            }
        ],
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": "off", // !!!change to error
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/explicit-module-boundary-types": [
            "off",
            {
                allowHigherOrderFunctions: false,
                allowTypedFunctionExpressions: false,
                allowDirectConstAssertionInArrowFunctions: false,
                shouldTrackReferences: false
            }
        ],
        "@typescript-eslint/no-this-alias": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/no-unnecessary-type-assertion": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/prefer-namespace-keyword": "error",
        "@typescript-eslint/prefer-readonly": "error",
        quotes: "off",
        "@typescript-eslint/quotes": ["error", "double", { allowTemplateLiterals: true }],
        "@typescript-eslint/restrict-plus-operands": "off",
        semi: "off",
        "@typescript-eslint/semi": ["error", "always"],
        "@typescript-eslint/type-annotation-spacing": ["error"],
        "@typescript-eslint/unified-signatures": "off", // change to warning
        "@typescript-eslint/no-var-requires": "off", // change to warning
        "@typescript-eslint/prefer-regexp-exec": "off", // change to warning
        "func-call-spacing": "off",
        "@typescript-eslint/func-call-spacing": ["error"],
        "@typescript-eslint/no-extra-semi": "error",
        "@typescript-eslint/no-extra-parens": "off",
        "no-redeclare": "off",
        "@typescript-eslint/no-redeclare": ["error"],
        "function-paren-newline": ["error", "multiline-arguments"],
        "brace-style": "off",
        "@typescript-eslint/brace-style": ["error", "1tbs", { allowSingleLine: true }],
        camelcase: [
            "error",
            {
                properties: "never",
                ignoreImports: true,
                allow: []
            }
        ],
        "@typescript-eslint/naming-convention": [
            "warn", // TODO: discuss if we need to set this back to "error" to be aligned with MyG dev repo
            {
                selector: ["classMethod", "typeMethod", "typeProperty", "classProperty"],
                format: ["camelCase"]
            },
            {
                selector: ["class", "typeAlias", "typeParameter", "enum"],
                format: ["PascalCase"]
            },
            {
                selector: "interface",
                format: ["PascalCase"],
                prefix: ["I"]
            },
            {
                selector: "function",
                modifiers: ["exported"],
                format: ["camelCase", "PascalCase"]
            },
            {
                selector: "variable",
                modifiers: ["const"],
                format: ["UPPER_CASE", "camelCase"]
            },
            {
                selector: "variableLike",
                format: ["camelCase"],
                leadingUnderscore: "allow"
            }
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
        "@typescript-eslint/consistent-generic-constructors": "error",
        "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
        "@typescript-eslint/no-meaningless-void-operator": "error",
        "@typescript-eslint/no-redundant-type-constituents": "error",
        "@typescript-eslint/no-useless-empty-export": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "off", // turn this on
        "@typescript-eslint/no-unnecessary-condition": [
            "off",
            {
                allowConstantLoopConditions: true
            }
        ], // 2 change to error (very useful but more then 2800 errors and most of them can't be solved easily)
        "@typescript-eslint/no-unnecessary-type-constraint": ["error"],
        "@typescript-eslint/prefer-as-const": ["error"],
        "@typescript-eslint/prefer-literal-enum-member": ["error"],
        "@typescript-eslint/prefer-readonly-parameter-types": "off",
        "@typescript-eslint/switch-exhaustiveness-check": ["error"],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": [
            "error",
            {
                ignoreTypeValueShadow: true,
                ignoreFunctionTypeParameterNameValueShadow: true
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
            "error",
            {
                allowShortCircuit: true,
                allowTernary: true
            }
        ],
        "object-curly-spacing": "off",
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        "comma-spacing": "off",
        "@typescript-eslint/comma-spacing": [
            "error",
            {
                before: false,
                after: true
            }
        ],
        "keyword-spacing": "off",
        "@typescript-eslint/keyword-spacing": [
            "error",
            {
                before: true,
                after: true
            }
        ],
        "space-before-function-paren": "off",
        "@typescript-eslint/space-before-function-paren": [ // TODO: discuss if we want to set this back to 'error' like for MyG devs
            "warn",
            {
                anonymous: "always",
                named: "always",
                asyncArrow: "always"
            }
        ],
        "space-infix-ops": "off",
        "@typescript-eslint/space-infix-ops": ["error"],
        "array-bracket-spacing": [
            "off", // 2 change to error
            "always",
            {
                objectsInArrays: false,
                arraysInArrays: false,
                singleValue: false
            }
        ],
        "key-spacing": [
            "error",
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        "computed-property-spacing": [
            "error",
            "never",
            {
                enforceForClassMembers: true
            }
        ],
        "no-var": "off",
        "no-param-reassign": "error",
        "prefer-rest-params": "error",
        "prefer-spread": "off",
        "prefer-object-spread": "error",
        "prefer-const": [
            "off",
            {
                // maybe later
                destructuring: "any",
                ignoreReadBeforeAssign: false
            }
        ],
        "no-useless-rename": ["error"],
        "no-whitespace-before-property": "error",
        "space-unary-ops": "error",
        "template-curly-spacing": ["error", "never"], // NOTE: this rule is always true in MyG dev repo but set to never in camera add-in (possibly due to conflict with prettier)
        "template-tag-spacing": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "use-isnan": "error",
        "array-callback-return": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "for-direction": "error",
        "no-class-assign": "error",
        "no-compare-neg-zero": "error",
        "no-const-assign": "error",
        "no-constant-binary-expression": "error",
        "no-constant-condition": "error",
        "no-constructor-return": "error",
        "no-dupe-args": "error",
        "no-dupe-keys": "error",
        "no-ex-assign": "error",
        "no-fallthrough": "error",
        "no-import-assign": "error",
        "no-invalid-regexp": "error",
        "no-loss-of-precision": "error",
        "no-new-native-nonconstructor": "error",
        "no-duplicate-imports": "error",
        "no-new-symbol": "error",
        "no-obj-calls": "error",
        "no-promise-executor-return": "error",
        "no-self-compare": "error",
        "no-setter-return": "error",
        "no-inner-declarations": "error",
        "no-irregular-whitespace": "error",
        "no-unmodified-loop-condition": "error",
        "no-unreachable": "error",
        "no-unreachable-loop": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-private-class-members": "error",
        "no-useless-backreference": "error",
        "require-atomic-updates": "error",
        "valid-typeof": "error",
        "no-prototype-builtins": "off",
        "block-spacing": "error",
        "arrow-spacing": ["error", { before: true, after: true }],
        "no-trailing-spaces": "error",
        "no-underscore-dangle": [
            "error",
            {
                enforceInMethodNames: false,
                allow: ["__detach", "__showCrashElt", "__events", "_isEdited", "_createdDateTime", "_wfx_settings"]
            }
        ],
        "no-restricted-globals": ["error", "name", "length", "event", "parent"],
        "no-unsafe-finally": "error",
        "no-empty-function": ["error", { allow: ["arrowFunctions", "constructors", "getters", "setters", "methods"] }],
        "no-useless-escape": "off",
        complexity: [
            "error",
            {
                max: 20
            }
        ],
        "no-useless-catch": "error",
        "no-extra-boolean-cast": ["error", { enforceForLogicalOperands: true }],
        "constructor-super": "error",
        "consistent-return": "error",
        curly: "error",
        "default-case": "error",
        eqeqeq: ["error", "always"],
        "id-blacklist": ["error", "any", "Boolean", "boolean", "Undefined", "undefined"],
        indent: "off",
        "@typescript-eslint/indent": [
            "error",
            4,
            {
                SwitchCase: 1,
                FunctionDeclaration: { body: 1, parameters: 1 },
                VariableDeclarator: 1,
                MemberExpression: 1,
                FunctionExpression: { parameters: 1 },
                CallExpression: { arguments: 1 },
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: false,
                offsetTernaryExpressions: false
            }
        ],
        "new-parens": "error",
        "arrow-body-style": ["off", "as-needed"], // change to error
        "id-match": "error",
        "max-classes-per-file": ["error", 9],
        "max-len": [
            "warn", // TODO: discuss what is the max length (camera add-in = 160, myg = 198)
            {
                ignorePattern:
                    'class [a-zA-Z]+ implements |^[\\s\\t]*\\/\\/|^[\\s\\t]*\\{|^[\\s\\t]*"|^[\\s\\t]*`|^[\\s\\t]*<|^[\\s\\t]*\\*|translate\\(',
                code: 198
            }
        ],
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-debugger": "error",
        "no-duplicate-case": "error",
        "no-empty": [
            "error",
            {
                allowEmptyCatch: true
            }
        ],
        "no-eval": "error",
        "no-extra-bind": "error",
        "no-irregular-whitespace": "error",
        "no-multiple-empty-lines": [
            "error",
            {
                max: 2
            }
        ],
        "no-case-declarations": "error",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-return-await": "error",
        "no-sequences": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-multi-spaces": "error",
        "space-before-blocks": "error",
        "no-dupe-else-if": "error",
        "no-else-return": ["error", { allowElseIf: false }],
        "no-lonely-if": "error",
        "no-unexpected-multiline": "error",
        "wrap-iife": ["error", "inside"],
        strict: "error",
        "no-restricted-properties": [
            2,
            {
                property: "substr",
                message:
                    "'substr' is deprecated for strings - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr#browser_compatibility"
            }
        ]
    }
};
