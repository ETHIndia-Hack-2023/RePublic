const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    project,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': ['warn', {}, { usePrettierrc: true }],
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-unsafe-assignment': ['warn'],
    'no-console': ['warn'],
    'prefer-const': ['warn'],
    '@typescript-eslint/no-unsafe-argument': ['warn'],
    '@typescript-eslint/no-unsafe-call': ['warn'],
    'no-await-in-loop': ['warn'],
    '@typescript-eslint/prefer-for-of': ['warn'],
    '@typescript-eslint/no-unsafe-call': ['warn'],
    '@typescript-eslint/no-unsafe-member-access': ['warn'],
    '@typescript-eslint/no-explicit-any': ['warn'],
    '@typescript-eslint/no-shadow': ['warn'],
    '@typescript-eslint/no-unsafe-return': ['warn'],
    eqeqeq: ['warn'],
    'import/no-default-export': ['warn'],
    'import/first': ['warn'],
    '@typescript-eslint/no-empty-interface': ['warn'],
    'no-useless-concat': ['warn'],
    '@typescript-eslint/naming-convention': ['warn'],
    '@typescript-eslint/no-empty-function': ['warn'],
    '@typescript-eslint/no-useless-constructor': ['warn'],
    'no-param-reassign': ['warn'],
    '@typescript-eslint/restrict-template-expressions': ['warn'],
    '@typescript-eslint/no-misused-promises': ['warn'],
    '@typescript-eslint/no-non-null-assertion': ['warn'],
    'no-empty': ['warn'],
  },
};
