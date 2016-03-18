import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import Home from './components/Home';

render(
  <Home />,
  document.getElementById('app-root')
);
