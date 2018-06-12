const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = (isDev, isAnalyze) => [
  // Define free variables
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    __PROD__: !isDev,
  }),

  // Simplifies creation of HTML files to serve your webpack bundles
  // https://github.com/jantimon/html-webpack-plugin
  new HtmlWebpackPlugin({
    title: 'Sky Bikes',
    template: path.resolve(__dirname, 'src/index.html'),
  }),

  // Allow extracting css to a single file in production
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  ...(isDev ? [] : [new MiniCssExtractPlugin()]),

  // To have HMR running
  // https://webpack.js.org/configuration/dev-server/#devserver-hot
  ...(isDev ? [new webpack.HotModuleReplacementPlugin()] : []),

  // Enable analyzing bundles
  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  ...(isAnalyze ? [new WebpackBundleAnalyzer.BundleAnalyzerPlugin()] : []),
];
