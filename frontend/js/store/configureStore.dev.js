import { applyMiddleware, compose, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import DevTools from '../containers/redux/DevTools';
import rootReducer from '../reducers';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      window.devToolsExtension ? f => f : persistState(getDebugSessionKey()),
    ),
  );

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
