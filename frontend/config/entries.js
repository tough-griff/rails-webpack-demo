import path from 'path';

import paths from './paths';

const entries = {
  app: [
    require.resolve('babel-polyfill'),
    require.resolve('whatwg-fetch'),
    path.join(paths.src, 'js', 'index'),
  ],
  'app.style': path.join(paths.src, 'css', 'index.scss'),
};

export default entries;
