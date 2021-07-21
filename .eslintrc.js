module.exports = {
  env : {
    browser : true,
    es6     : true,
    mocha   : true,
    node    : true,
  },
  extends : [
    'eslint:recommended',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parser        : '@typescript-eslint/parser',
  parserOptions : {
    // project: `./tsconfig.json`,
    ecmaVersion  : 2021,
    ecmaFeatures : {
      jsx : true,
    },
  },
  plugins : ['@typescript-eslint'],
  rules   : {
    camelcase                           : 'off',
    'comma-dangle'                      : ['error', 'always-multiline'],
    eqeqeq                              : ['error', 'always'],
    'import/no-extraneous-dependencies' : 0,
    indent                              : ['error', 2],
    'key-spacing'                       : [
      'error',
      {
        singleLine : {
          beforeColon : false,
          afterColon  : true,
        },
        multiLine : {
          beforeColon : true,
          afterColon  : true,
          align       : 'colon',
        },
      },
    ],
    'keyword-spacing' : [
      'error',
      {
        after  : true,
        before : true,
      },
    ],
    'linebreak-style'       : ['error', 'unix'],
    'no-console'            : 'error', //todo: not sure
    'no-constant-condition' : [
      'error',
      {
        checkLoops : false,
      },
    ],
    'no-multi-spaces' : [
      'error',
      {
        exceptions : {
          ImportDeclaration  : true,
          VariableDeclarator : true,
        },
      },
    ],
    'no-trailing-spaces'                               : ['error'],
    'no-use-before-define'                             : 0,
    'object-curly-spacing'                             : ['error', 'always'],
    'prefer-destructuring'                             : 0,
    'space-before-function-paren'                      : ['error', 'never'],
    semi                                               : 0,
    quotes                                             : ['error', 'single'],
    // 'react/jsx-fragments': ['error'],
    // 'react/prop-types': ['error'],
    // 'react/jsx-uses-react': 'error',
    // 'react/jsx-uses-vars': 'error',
    '@typescript-eslint/ban-ts-comment'                : 0,
    // Should find away to remove these :|
    '@typescript-eslint/no-explicit-any'               : 0,
    '@typescript-eslint/no-unsafe-assignment'          : 0,
    '@typescript-eslint/no-unsafe-call'                : 0,
    '@typescript-eslint/no-unsafe-member-access'       : 0,
    '@typescript-eslint/no-unsafe-return'              : 0,
    '@typescript-eslint/restrict-template-expressions' : 0,
  },
  settings : {
    react : {
      version : 'detect',
    },
  },
};
