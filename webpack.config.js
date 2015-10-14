var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './app/components/torrent-editor.jsx',
  output: {
    path:  path.join(__dirname, '.tmp/assets'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'styles': __dirname + '/app/styles',
      'components': __dirname + '/app/components'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?stage=0',
      cacheDirectory: path.join(__dirname, ".tmp/webpack")
    }, {
      test: /\.(sass|scss)/,
      loader: 'style!css!sass'
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
  svgoConfig: {
    plugins: [
      {removeTitle: true},
      {convertColors: {shorthex: false}}
    ]
  }
};
