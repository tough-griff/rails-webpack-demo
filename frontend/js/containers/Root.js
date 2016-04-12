let Root;

if (process.env.NODE_ENV === 'development') {
  Root = require('./Root.dev').default;
} else {
  Root = require('./Root.prod').default;
}

export default Root;
