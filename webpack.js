import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from './webpack.config.dev.babel';

const app = express();
const compiler = webpack(config);
const hostName = process.env.HOSTNAME || 'lvh.me';
const nodePort = process.env.NODE_PORT || '5050';

// Set the `Access-Control-Allow-Origin: *` header.
app.use(cors());

// Configure webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

// configure webpack-hot-middleware
app.use(webpackHotMiddleware(compiler));

// configure https express server for securely serving assets.
const server = https.createServer({
  key: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY),
  cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
}, app);

/* eslint-disable no-console */
server.listen(nodePort, hostName, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Webpack server listening at //${hostName}:${nodePort}.`);
});
/* eslint-enable no-console */
