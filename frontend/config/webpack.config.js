import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import castArray from 'lodash/castArray';
import compact from 'lodash/compact';
import mapValues from 'lodash/mapValues';
import WatchMissingPlugin from 'react-dev-utils/WatchMissingNodeModulesPlugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import babelConfig from './babel';
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

const uglifyConfig = {
  compress: {
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
  sourceMap: true,
};

export default function webpackConfig({ production }) {
  return {
    bail: !!production,
    devtool: production ? 'source-map' : 'cheap-module-eval-source-map',
    entry: production ? entries : devEntries,
    module: {
      rules: [{
        test: /\.jsx?$/,
        use: 'eslint-loader',
        enforce: 'pre',
        include: paths.src,
      }, {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: paths.src,
        options: {
          babelrc: false,
          presets: babelConfig,
        },
      }, {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
        }),
        include: [paths.src, paths.modules],
      }],
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
      filename: '[name].bundle.js',
      path: paths.build,
      pathinfo: true,
      publicPath: production ? '/assets/' : `${serverPath}/assets/javascripts/`,
    },
    performance: {
      hints: production ? 'warning' : false,
    },
    plugins: compact([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(production ? 'production' : 'development'),
        },
      }),
      production ? null : new webpack.HotModuleReplacementPlugin(),
      production ? null : new webpack.NamedModulesPlugin(),
      production ? null : new CaseSensitivePathsPlugin(),
      production ? null : new WatchMissingPlugin(paths.modules),
      production ? new webpack.optimize.UglifyJsPlugin(uglifyConfig) : null,
      new ExtractTextPlugin({
        filename: '../stylesheets/[name].bundle.css',
        disable: !production,
      }),
      // TODO: I think bundle analyzer is broken with webpack 2
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        generateStatsFile: true,
        openAnalyzer: false,
      }),
    ]),
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['node_modules'],
    },
  };
}
