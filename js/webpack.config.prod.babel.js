import ExtractTextPlugin from 'extract-text-webpack-plugin';
import mapValues from 'lodash.mapvalues';
import merge from 'lodash.merge';
import webpack from 'webpack';

import devConfig from './webpack.config.dev.babel.js';

// Remove the hot module replacement entry point for development config `entry`.
mapValues(devConfig.entry, value => value.shift());

export default merge(devConfig, {
  debug: false,
  devtool: 'source-map',
  module: {
    preLoaders: null,
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap'),
        test: /\.scss$/,
      },
    ],
  },
  output: {
    publicPath: '/assets',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    }),
    new ExtractTextPlugin('../stylesheets/[name].bundle.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
});
