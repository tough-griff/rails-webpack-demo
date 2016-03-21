import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { merge } from 'lodash';
import webpack from 'webpack';

import devConfig from './webpack.config.dev.babel.js';
import entries from './entries.json';

const prodConfig = merge(devConfig, {
  debug: false,
  devtool: 'source-map',
  entry: entries,
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
      'process.env': { NODE_ENV: JSON.stringify('production') },

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

export default prodConfig;
