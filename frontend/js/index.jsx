import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './configureStore';

const rootEl = document.getElementById('react-app');
const store = configureStore();

render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  rootEl,
);

// Enable Webpack hot module replacement using react-hot-loader.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;

    render(
      <AppContainer>
        <NextRoot store={store} />
      </AppContainer>,
      rootEl,
    );
  });
}
