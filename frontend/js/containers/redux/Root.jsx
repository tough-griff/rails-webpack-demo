import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import rootSaga from '../../sagas';
import routes from '../../routes';
import { storeShape } from '../../shapes';

/**
 * Root element which mounts a redux provider, react router, and starts our
 * root saga.
 */
function Root({ store }) {
  store.runSaga(rootSaga);

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
