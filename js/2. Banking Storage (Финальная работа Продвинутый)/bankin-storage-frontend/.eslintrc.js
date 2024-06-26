// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['eslint:recommended', 'plugin:jest/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier', 'jest'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'arrow-parens': ['error', 'always'],
    'no-unused-vars': 'error',
    eqeqeq: 'error',
    'no-var': 'error',
    'no-extra-semi': 'error',
    strict: ['error', 'global'],
    'import/export': 'off',
    'prettier/prettier': 'error',
  },
};
