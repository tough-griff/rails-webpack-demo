import path from 'path';

import paths from './paths';

const entries = {
  app: [
    require.resolve('babel-polyfill'),
    require.resolve('whatwg-fetch'),
    path.join(paths.src, 'js', 'index'),
  ],
};

export default entries;
