module.exports = (isDev, isVerbose) => ({
  // Config for webpack dev server plugin (small http-server)
  // https://webpack.js.org/configuration/dev-server/
  port: 9000,

  // Shows a full-screen overlay in the browser when there are compiler errors or warnings.
  // https://webpack.js.org/configuration/dev-server/#devserver-overlay
  overlay: true,

  // When open is enabled, the dev server will open the browser
  // https://webpack.js.org/configuration/dev-server/#devserver-open
  open: isDev,

  // Webpack's Hot Module Replacement feature
  // https://webpack.js.org/configuration/dev-server/#devserver-hot
  hot: isDev,

  // Enable gzip compression for everything served
  // https://webpack.js.org/configuration/dev-server/#devserver-compress
  compress: true,

  // Will show in console when HMR kicks in if enabled
  // https://webpack.js.org/configuration/dev-server/#devserver-clientloglevel
  clientLogLevel: isVerbose ? 'info' : 'none',

  // No need for webpack bundle info in dev mode
  // https://webpack.js.org/configuration/dev-server/#devserver-noinfo-
  noInfo: !isVerbose,
});
