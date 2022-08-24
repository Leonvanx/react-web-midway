module.exports = {
  rules: {
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_|^err|^ev', // _xxx, err, error, ev, event
      },
    ],
  },
};
