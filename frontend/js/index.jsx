import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';

import Root from './containers/redux/Root';
import configureStore from './store';

render(<Root store={configureStore()} />, document.getElementById('app'));
