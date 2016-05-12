export default (process.env.NODE_ENV === 'development')
  ? require('./configureStore.dev').default
  : require('./configureStore.prod').default;
