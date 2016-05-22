const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  env: {
    mocha: true
  },
  rules: {
    'func-names': OFF,
    'prefer-arrow-callback': OFF
  }
}
