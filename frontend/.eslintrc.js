const OFF = 0
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    'new-cap': [WARN, { newIsCap: true, capIsNew: false }],
    'no-unused-vars': [ERROR, { argsIgnorePattern: "^_" }],

    'react/prefer-stateless-function': WARN,
  },
}
