module.exports = {
  env: {
    mocha: true
  },
  globals: {
    chai: true,
    expect: true,
    sinon: true,
  },
  rules: {
    'func-names': 'off',
    'prefer-arrow-callback': 'off',

    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': true,
    }],
  }
}
