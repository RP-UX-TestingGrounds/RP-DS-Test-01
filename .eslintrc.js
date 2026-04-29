module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  ignorePatterns: [
    'src/stories',
  ],
  parserOptions: {
    ecmaVersion: 12,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'react/jsx-runtime': 'automatic',
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'max-len': [
      'error',
      {
        code: 150,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreUrls: true,
      },
    ],
    'react/jsx-first-prop-new-line': [
      1,
      'multiline',
    ],
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 2,
      },
    ],
    'react/jsx-closing-bracket-location': 1,
    'jsx-quotes': [
      'warn',
    ],
    'arrow-body-style': [
      'off',
      'as-needed',
    ],
    'react/react-in-jsx-scope': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.test.{js,jsx}',
          '**/*.stories.{js,jsx}',
        ],
        optionalDependencies: false,
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^storybook/'],
      },
    ],
  },
};
