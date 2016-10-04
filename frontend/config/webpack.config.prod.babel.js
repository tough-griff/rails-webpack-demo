import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import merge from 'webpack-merge';
import validate from 'webpack-validator';

import devConfig from './webpack.config.dev.babel';
import entries from './entries';
import paths from './paths';

const uglifyConfig = {
  compressor: {
    screw_ie8: true,
    warnings: false,
  },
  mangle: {
    screw_ie8: true,
  },
  output: {
    comments: false,
    screw_ie8: true,
  },
};

const prodConfig = merge.smart(devConfig, {
  bail: true,
  debug: false,
  devtool: 'source-map',
  module: {
    loaders: [{
      loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap']),
      test: /\.s?css$/,
      include: [paths.src, paths.modules],
    }],
  },
  output: {
    publicPath: '/assets/',
  },
});

// Overwrite, don't merge, the `entry` and `plugins` options.
prodConfig.entry = entries;
prodConfig.plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('production') },
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin(uglifyConfig),
  new ExtractTextPlugin('../stylesheets/[name].bundle.css'),
];

export default validate(prodConfig, {
  rules: {
    'loader-enforce-include-or-exclude': true,
    'loader-prefer-include': true,
  },
});
