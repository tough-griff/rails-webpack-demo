import path from 'path';
import webpack from 'webpack';

const hostName = process.env.HOSTNAME || 'lvh.me';
const nodePort = process.env.NODE_PORT || '5050';
const serverPath = `//${hostName}:${nodePort}`;

export default {
  context: __dirname,

  entry: {
    app: [
      `webpack-hot-middleware/client?path=${serverPath}/__webpack_hmr`,
      './js/index',
    ],
  },

  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: '[name].bundle.js',
    publicPath: `${serverPath}/assets/javascripts/`,
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
    ],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
    }),
  ],
};
