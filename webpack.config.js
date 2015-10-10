var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: './app/scripts/main.js',
  output: {
    path:  path.join(__dirname, '.tmp/scripts'),
    filename: 'bundle.js'
  },
  resolve: {
    root: [path.join(__dirname, "bower_components")]
  },
  plugins: [
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
    ),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    }),
    new webpack.optimize.DedupePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        cacheDirectory: path.join(__dirname, ".tmp/webpack")
      }
    ]
  }
};
