module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  extends: ['airbnb-base'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
