import React from 'react';
import { render } from 'react-dom';

import Root from './containers/redux/Root';
import configureStore from './configureStore';

render(<Root store={configureStore()} />, document.getElementById('react-app'));
