'use-strict';

var path = require('path');
var webpack = require('webpack');

var HOST = "http://localhost:" + process.env.NODE_PORT || '4000';

module.exports = {
  context: __dirname,

  entry: {
    app: [
      'webpack-hot-middleware/client?path=' + HOST + '/assets/javascripts/__webpack_hmr',
      './js/index'
    ]
  },

  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name].bundle.js',
    publicPath: HOST + '/assets/javascripts/'
  },

  module: {
    preLoaders: [
      {
        loader: 'eslint',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  debug: true,

  devtool: 'eval',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    })
  ]
};
