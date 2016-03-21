let configureStore;

if (process.env.NODE_ENV === 'development') {
  configureStore = require('./configureStore.dev').default;
} else {
  configureStore = require('./configureStore.prod').default;
}

export default configureStore;
