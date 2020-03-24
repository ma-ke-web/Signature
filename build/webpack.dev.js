const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, '/../dist'),
    compress: true,
    hot: true,
    watchOptions: {
      poll: true
    },
    host: '0.0.0.0',
    port: 8080
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
});
