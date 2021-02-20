// {
//     "env": {
//         "browser": true,
//         "es2021": true
//     },
//     "extends": [
//         "eslint:recommended",
//         "plugin:@typescript-eslint/recommended",
//         "standard"
//     ],
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaVersion": 12,
//         "sourceType": "module"
//     },
//     "plugins": [
//         "@typescript-eslint"
//     ],
//     "rules": {
//         "indent": [
//             "error",
//             "tab"
//         ],
//         "linebreak-style": [
//             "error",
//             "windows"
//         ],
//         "quotes": [
//             "error",
//             "single"
//         ],
//         "semi": [
//             "error",
//             "never"
//         ],
//         "no-console": "warn",
//         "camelcase": "off",
//         "@typescript-eslint/camelcase": "off",
//         "@typescript-eslint/explicit-function-return-type": "off",
//         "no-unused-vars": "off",
//         "no-unused-expressions": "off"
//     }
// }

module.exports = {
    env: {
      es6: true,
      mocha: true,
      node: true,
    },
    extends: ["plugin:@typescript-eslint/recommended", "standard"],
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly",
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
    },
    plugins: ["@typescript-eslint", "markdown"],
    overrides: [
      {
        files: ["*.md"],
        processor: "markdown/markdown",
      },
    ],
    overrides: [
      {
        files: ["*.md"],
      },
    ],
    rules: {
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      camelcase: "off",
      "max-len": [
        "warn",
        {
          code: 180,
          ignoreStrings: true,
          ignoreUrls: true,
          ignoreComments: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": ["error", {
        "argsIgnorePattern": "_"
      }],
      "@typescript-eslint/interface-name-prefix": "off",
      "max-lines": ["warn", 500],
      "no-return-assign": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      "no-useless-constructor": "off",
      "no-console": "warn",
      "no-empty-function": "off"
      // "sort-keys": "warn",
    },
  };
  