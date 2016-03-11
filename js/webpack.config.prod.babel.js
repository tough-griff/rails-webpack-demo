import _ from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';

import devConfig from './webpack.config.dev.babel.js';

// Prunes the Webpack HMR entry points from the development config `entry` key.
function pruneHmrEntries(entry) {
  return _.mapValues(entry, _.tail);
}

export default _.merge(devConfig, {
  debug: false,
  devtool: 'source-map',
  entry: pruneHmrEntries(devConfig.entry),
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
