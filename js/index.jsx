import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

const Home = () => <h1>Hello, world!!</h1>;

ReactDOM.render(
  <Home />,
  document.getElementById('app-root')
);
