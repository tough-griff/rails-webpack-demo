import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config, {
  appHost, nodePort, serverPath,
} from './webpack.config.dev.babel';

const app = express();
const compiler = webpack(config);
const isHttps = !!process.env.HTTPS;

// Set the `Access-Control-Allow-Origin: *` header.
app.use(cors());

// Configure webpack-dev-middleware
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));

// configure webpack-hot-middleware
app.use(webpackHotMiddleware(compiler));

let server = app;

if (isHttps) {
  // configure https express server for securely serving assets.
  server = https.createServer({
    cert: fs.readFileSync(process.env.SSL_CERTIFICATE),
    key: fs.readFileSync(process.env.SSL_CERTIFICATE_KEY),
  }, app);
}

/* eslint-disable no-console */
server.listen(nodePort, appHost, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Webpack server listening at http${(isHttps) ? 's' : ''}:${serverPath}.`);
});
/* eslint-enable no-console */
