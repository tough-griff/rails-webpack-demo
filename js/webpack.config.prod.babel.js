import webpack from 'webpack';
import merge from 'lodash.merge';

import devConfig from './webpack.config.dev.babel.js';

export default merge(devConfig, {
  debug: false,
  devtool: 'source-map',
  entry: {
    app: './src/index',
  },
  module: {
    preLoaders: null,
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }],
  },
  output: {
    publicPath: '/assets',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
    }),
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
