import { jsdom } from 'jsdom';

global.document = jsdom(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="csrf-token" content="FAKE_CSRF_TOKEN" />
    </head>
    <body></body>
  </html>
`);
global.window = document.defaultView;
global.navigator = global.window.navigator;
