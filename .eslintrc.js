module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: `./tsconfig.json`,
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', '@typescript-eslint', 'react'],
  rules: {
    camelcase: 'off',
    'comma-dangle': ['error', 'always-multiline'],
    eqeqeq: ['error', 'always'],
    'import/no-extraneous-dependencies': 0,
    indent: ['error', 2],
    'key-spacing': [
      'error',
      {
        singleLine: {
          beforeColon: false,
          afterColon: true,
        },
        multiLine: {
          beforeColon: true,
          afterColon: true,
          align: 'colon',
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
    'no-console': 'error', //todo: not sure
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
    'no-underscore-dangle': 'error',
    'no-use-before-define': 0,
    'object-curly-spacing': ['error', 'always'],
    'prefer-destructuring': 0,
    quotes: ['error', 'single'],
    'react/jsx-fragments': ['error'],
    'react/prop-types': ['error'],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    semi: 'never',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
