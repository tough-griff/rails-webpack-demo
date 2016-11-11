import path from 'path';

import paths from './paths';

const entries = {
  app: [
    require.resolve('babel-polyfill'),
    path.join(paths.src, 'css', 'index.scss'),
    path.join(paths.src, 'js', 'index'),
  ],
};

export default entries;
