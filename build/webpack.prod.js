const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/signature.js',
  output: {
    library: 'Signature',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    libraryExport: 'default',
    path: path.resolve(__dirname, '../dist'),
    filename: 'signature.js'
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
