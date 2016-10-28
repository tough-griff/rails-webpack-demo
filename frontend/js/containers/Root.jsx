import React from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Redirect, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../components/App';
import rootSaga from '../sagas';
import { storeShape } from '../shapes';

/**
 * Root element which mounts a redux provider, react router, and starts our
 * root saga.
 */
function Root({ store }) {
  // Configure react-router to work with redux-immutable.
  // see https://github.com/gajus/redux-immutable#using-with-react-router-redux
  const history = syncHistoryWithStore(browserHistory, store, {
    selectLocationState(state) {
      return state.get('routing').toJS();
    },
  });

  store.runSaga(rootSaga);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/:filter" component={App} />
        <Redirect from="/" to="/all" />
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: storeShape.isRequired,
};

export default Root;
