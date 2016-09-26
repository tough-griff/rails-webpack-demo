import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './configureStore';

const rootEl = document.getElementById('react-app');
const store = configureStore();

function renderApp(App) {
  if (!rootEl) return;

  render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    rootEl,
  );
}

renderApp(Root);

// Enable Webpack hot module replacement using react-hot-loader.
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    renderApp(require('./containers/Root').default);
  });
}
