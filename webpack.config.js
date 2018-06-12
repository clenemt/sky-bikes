/* eslint global-require: off */

const path = require('path');

const config = (env = {}, argv) => {
  const isDev = argv.mode !== 'production';
  const isVerbose = env.verbose;
  const isAnalyze = env.analyze;

  const rules = require('./webpack.rules')(isDev);
  const devServer = require('./webpack.devserver')(isDev, isVerbose);
  const plugins = require('./webpack.plugins')(isDev, isAnalyze);

  return {
    // Compile for usage in a browser-like environment
    // https://webpack.js.org/configuration/target/
    target: 'web',

    // Entry point for main js file
    // https://webpack.js.org/configuration/entry-context/#entry
    entry: {
      bundle: ['./src/entry.js'],
    },

    // How and where it should output our bundle
    // https://webpack.js.org/configuration/output/
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: `[name].js?[hash]`,
    },

    module: {
      rules: [rules.js, rules.css, rules.asset],
    },

    // Don't attempt to continue if there are any errors.
    // https://webpack.js.org/configuration/other-options/#bail
    bail: !isDev,

    // Cache the generated webpack modules and chunks to improve build speed
    // https://webpack.js.org/configuration/other-options/#cache
    cache: isDev,

    // Precise control of what bundle information gets displayed
    // https://webpack.js.org/configuration/stats/
    stats: isVerbose ? 'verbose' : 'normal',

    optimization: isDev
      ? undefined
      : {
          // Enable uglify in production
          // https://webpack.js.org/configuration/optimization/#optimization-minimize
          minimize: true,

          // Enable code splitting in production
          // https://webpack.js.org/guides/code-splitting/
          splitChunks: {
            chunks: 'all',
          },
        },

    plugins,

    // Choose a developer tool to enhance debugging
    // https://webpack.js.org/configuration/devtool/
    devtool: isDev ? 'inline-source-map' : false,

    // These options change how modules are resolved. webpack provides reasonable defaults
    // https://webpack.js.org/configuration/resolve/
    resolve: {
      // So we can avoid `.jsx` & `.js` when importing files
      extensions: ['.js', '.jsx'],
    },

    // Turn off performance hints during development because we don't do any
    // splitting or minification in interest of speed. These warnings become
    // cumbersome.
    performance: {
      hints: isDev ? false : 'warning',
    },

    devServer,
  };
};

module.exports = config;
