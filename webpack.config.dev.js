/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');
var path = require('path');

module.exports = {

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: "http://localhost:8081/assets/"
  },

  cache: true,
  debug: true,
  devtool: 'sourcemap',
  entry: [
      './app/components/torrent-editor.jsx',
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8081'
  ],
  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/app/styles',
      'components': __dirname + '/app/components'
    }
  },
  module: {
    preLoaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'react-hot!babel?stage=0',
      cacheDirectory: path.join(__dirname, ".tmp/webpack")
    }, {
      test: /\.(sass|scss)/,
      loader: 'style!css!sass?sourceMap'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url?limit=8192'
    },{
      test: /.*\.svg$/,
      loader: "raw!svgo?useConfig=svgoConfig"
    }]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  
  svgoConfig: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}}
    ]
  }

};
