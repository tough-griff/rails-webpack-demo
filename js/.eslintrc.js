const OFF = 0
const WARN = 1;
const ERROR = 2;

module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'babel'
  ],
  rules: {
    'new-cap': OFF,
    'babel/new-cap': ERROR,
    'react/prefer-stateless-function': OFF,
  },
}
