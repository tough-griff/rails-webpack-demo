import path from 'path';

const paths = {
  // frontend/
  src: path.resolve(__dirname, '..'),

  // node_modules/
  modules: path.resolve(__dirname, '..', '..', 'node_modules'),

  // app/assets/javascripts/
  build: path.resolve(__dirname, '..', '..', 'app', 'assets', 'javascripts'),
};

export default paths;
