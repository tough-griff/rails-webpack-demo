import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';

export default function configureStore(initialState) {
  const saga = createSagaMiddleware();
  let devToolsStoreEnhancer = f => f;

  // Enable devtools in development environment.
  if (process.env.NODE_ENV === 'development' && window.devToolsExtension) {
    devToolsStoreEnhancer = window.devToolsExtension();
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(saga),
      devToolsStoreEnhancer,
    ),
  );

  // Enable Webpack hot module replacement for reducers.
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;

      store.replaceReducer(nextRootReducer);
    });
  }

  return {
    runSaga: saga.run,
    ...store,
  };
}
