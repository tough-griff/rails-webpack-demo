import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import routes from '../routes';

function Root({ store }) {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
