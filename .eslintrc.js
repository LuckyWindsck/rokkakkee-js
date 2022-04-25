module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': ['warn', {
      allow: ['clear', 'log'],
    }],
    'no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
    }],
  },
};
