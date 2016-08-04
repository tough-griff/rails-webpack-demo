import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import routes from '../../routes';
import { storeShape } from '../../shapes';

/**
 * Root element which mounts a redux provider and react router.
 */
function Root({ store }) {
  return (
    <Provider store={store}>
      <Router history={browserHistory} routes={routes} />
    </Provider>
  );
}

Root.propTypes = {
  store: storeShape.isRequired,
};

export default Root;
