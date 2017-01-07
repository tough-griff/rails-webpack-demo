import React, { Component } from 'react';
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
export default class Root extends Component {
  static propTypes = {
    store: storeShape.isRequired,
  }

  /**
   * We set `history` and `routes` on the component once, on initialization, to
   * prevent react-router warnings on HMR updates.
   */
  constructor(props) {
    super(props);

    this.history = syncHistoryWithStore(browserHistory, props.store, {
      // https://github.com/gajus/redux-immutable#using-with-react-router-redux
      selectLocationState(state) {
        return state.get('routing').toJS();
      },
    });

    this.routes = [
      <Route path="/:filter" component={App} />,
      <Redirect from="/" to="/all" />,
    ];

    // Run the saga once everything is set up.
    props.store.runSaga(rootSaga);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.history} routes={this.routes} />
      </Provider>
    );
  }
}
