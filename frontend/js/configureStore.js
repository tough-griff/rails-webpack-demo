import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  let devToolsStoreEnhancer = f => f;

  // Enable devtools in development environment.
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    devToolsStoreEnhancer = window.devToolsExtension();
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      devToolsStoreEnhancer,
    ),
  );

  // Enable Webpack hot module replacement for reducers.
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
