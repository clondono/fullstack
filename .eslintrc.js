module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    env: {
      es6: true,
    },
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    camelcase: 0,
    'comma-dangle': ['error', 'always-multiline'],
    eqeqeq: ['error', 'smart'],
    'import/no-extraneous-dependencies': 0,
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: {
          const: 2,
          let: 2,
          var: 2,
        },
      },
    ],
    'key-spacing': [
      'error',
      {
        align: {
          afterColon: true,
          beforeColon: true,
          on: 'colon',
        },
      },
    ],
    'keyword-spacing': [
      'error',
      {
        after: true,
        before: true,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'no-alert': 2,
    'no-console': 0,
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'no-multi-spaces': [
      'error',
      {
        exceptions: {
          ImportDeclaration: true,
          VariableDeclarator: true,
        },
      },
    ],
    'no-trailing-spaces': ['error'],
    'no-underscore-dangle': 0,
    'no-unused-vars': [
      'error',
      {
        args: 'none',
      },
    ],
    'no-use-before-define': 0,
    'object-curly-spacing': ['error', 'always'],
    'prefer-destructuring': 0,
    quotes: ['error', 'single'],
    'react/jsx-fragments': ['error'],
    'react/prop-types': ['error'],
    semi: ['error'],
  },
  settings: {},
};
