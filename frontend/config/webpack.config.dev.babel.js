import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import castArray from 'lodash/castArray';
import mapValues from 'lodash/mapValues';
import WatchMissingPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import webpack from 'webpack';
import validate from 'webpack-validator';

import entries from './entries';
import paths from './paths';

export const appHost = process.env.APP_HOST || 'lvh.me';
export const nodePort = process.env.NODE_PORT || '5050';
export const serverPath = `//${appHost}:${nodePort}`;
const webpackHmrPath = require.resolve('webpack-hot-middleware/client');
const webpackHmrEntry = `${webpackHmrPath}?path=${serverPath}/__webpack_hmr`;
const reactHotLoaderEntry = require.resolve('react-hot-loader/patch');

// Prepend the webpack HMR entry point to all defined entry points.
const devEntries = mapValues(entries, entry =>
  [webpackHmrEntry, reactHotLoaderEntry, ...castArray(entry)]
);

const devConfig = {
  debug: true,
  devtool: 'eval-source-map',
  entry: devEntries,
  module: {
    preLoaders: [{
      loader: 'eslint',
      test: /\.jsx?$/,
      include: paths.src,
    }],
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      include: paths.src,
    }, {
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      test: /\.s?css$/,
      include: [paths.src, paths.modules],
    }, {
      loader: 'json',
      test: /\.json$/,
      include: [paths.src, paths.modules],
    }],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  output: {
    filename: '[name].bundle.js',
    path: paths.build,
    pathinfo: true,
    publicPath: `${serverPath}/assets/javascripts/`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('development') },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new WatchMissingPlugin(paths.modules),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
};

export default validate(devConfig, {
  rules: {
    'loader-enforce-include-or-exclude': true,
    'loader-prefer-include': true,
  },
});
