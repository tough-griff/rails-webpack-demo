module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    // ESLint core rules.
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
      imports: 'always-multiline',
      objects: 'always-multiline',
    }],
    'global-require': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // Import plugin rules.
    'import/order': ['warn', {
      groups: [['builtin', 'external'], ['index', 'internal', 'parent', 'sibling']],
      'newlines-between': 'always',
    }],

    // React plugin rules.
    'react/prefer-stateless-function': 'warn',
  },
}
