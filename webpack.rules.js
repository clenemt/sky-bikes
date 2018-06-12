const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (isDev) => ({
  css: {
    test: /\.(css|scss)$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        // CSS Loader https://github.com/webpack/css-loader
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: isDev,
          // CSS Nano http://cssnano.co/options/
          minimize: !isDev,
        },
      },
      {
        // PostCSS Loader https://github.com/postcss/postcss-loader
        loader: 'postcss-loader',
        options: {
          sourceMap: isDev,
          plugins: [
            // Add vendor prefixes to CSS rules using values from caniuse.com
            // https://github.com/postcss/autoprefixer
            autoprefixer(),
          ],
        },
      },
      {
        // Allow resolving `url('...')` from node_modules
        // https://github.com/bholloway/resolve-url-loader
        loader: 'resolve-url-loader',
      },
      {
        // Sass Loader https://github.com/webpack-contrib/sass-loader
        loader: 'sass-loader',
        options: {
          sourceMap: isDev,
        },
      },
    ],
  },

  js: {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /(node_modules|bower_components)/,
    query: {
      // Faster build thanks to caching
      // https://github.com/babel/babel-loader#options
      cacheDirectory: isDev,

      presets: [
        // A Babel preset that can automatically determine the Babel plugins and polyfills
        // https://github.com/babel/babel/tree/master/packages/babel-preset-env
        [
          '@babel/preset-env',
          {
            modules: isDev ? 'commonjs' : false,
            useBuiltIns: isDev ? false : 'usage',
          },
        ],

        // Experimental ECMAScript proposals
        // https://babeljs.io/docs/plugins/preset-stage-2/
        ['@babel/preset-stage-2', { decoratorsLegacy: true }],

        // JSX
        // https://babeljs.io/docs/plugins/preset-react/
        '@babel/preset-react',
      ],

      plugins: [
        // Allows for optional chaining through `?.`
        // https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-optional-chaining
        '@babel/plugin-proposal-optional-chaining',
      ],
    },
  },

  asset: {
    // File loader
    // https://github.com/webpack-contrib/file-loader
    test: /\.(jpg|jpeg|gif|png|svg|woff|woff2)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]',
    },
  },
});
