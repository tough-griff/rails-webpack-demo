import path from 'path';
import webpack from 'webpack';

const hostName = process.env.HOSTNAME || 'lvh.me';
const nodePort = process.env.NODE_PORT || '5050';
const serverPath = `//${hostName}:${nodePort}`;
const webpackHmrEntry = `webpack-hot-middleware/client?path=${serverPath}/__webpack_hmr`;

export default {
  context: __dirname,
  debug: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      webpackHmrEntry,
      './src/index',
    ],
    'app.style': [
      webpackHmrEntry,
      '../app/assets/stylesheets/index.scss',
    ],
  },
  module: {
    preLoaders: [
      {
        loader: 'eslint',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      {
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
        test: /\.scss$/,
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'app', 'assets', 'javascripts'),
    filename: '[name].bundle.js',
    publicPath: `${serverPath}/assets/javascripts/`,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },
};
