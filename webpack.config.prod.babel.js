import webpack from 'webpack';
import merge from 'lodash.merge';

import config from './webpack.config.dev.babel.js';

export default merge(config, {
  debug: false,
  devtool: 'source-map',
  entry: {
    app: './js/index',
  },
  module: {
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }],
  },
  output: {
    publicPath: '/assets',
  },
  plugins: [new webpack.optimize.OccurenceOrderPlugin()],
});
