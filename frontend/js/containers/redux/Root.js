export default (process.env.NODE_ENV === 'development')
  ? require('./Root.dev').default
  : require('./Root.prod').default;
