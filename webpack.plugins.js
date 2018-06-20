const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBundleAnalyzer = require('webpack-bundle-analyzer');

module.exports = (isDev, isAnalyze) => [
  // Define free variables
  // https://webpack.js.org/plugins/define-plugin/
  new webpack.DefinePlugin({
    __PROD__: !isDev,
    __BASE_URL__: "'/sky-bikes'",
  }),

  // Allow extracting css to a single file
  // https://github.com/webpack-contrib/mini-css-extract-plugin
  new MiniCssExtractPlugin(),

  // Enable analyzing bundles
  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  ...(isAnalyze ? [new WebpackBundleAnalyzer.BundleAnalyzerPlugin()] : []),
];
