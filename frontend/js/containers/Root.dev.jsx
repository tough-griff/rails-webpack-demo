import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import DevTools from './DevTools';
import routes from '../routes';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
