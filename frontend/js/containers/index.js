export App from './App';
export DevTools from './DevTools';

let Root;

if (process.env.NODE_ENV === 'development') {
  Root = require('./Root.dev').default;
} else {
  Root = require('./Root.prod').default;
}

export { Root };
