module.exports = {
  // Allow jest to understand our code
  // https://facebook.github.io/jest/docs/en/configuration.html#transform-object-string-string
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  // https://facebook.github.io/jest/docs/en/configuration.html#globals-object
  globals: {
    __PROD__: true,
    __BASE_URL__: '',
  },
};
