import cors from 'cors';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.dev.babel';

const app = express();
const compiler = webpack(config);
const hostName = process.env.HOSTNAME || 'localhost';
const nodePort = process.env.NODE_PORT || '4000';

app.use(cors());

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

/* eslint-disable no-console */
app.listen(nodePort, hostName, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Webpack server listening at http://${hostName}:${nodePort}.`);
});
/* eslint-enable no-console */
