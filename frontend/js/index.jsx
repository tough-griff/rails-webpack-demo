import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './containers/Root';
import configureStore from './configureStore';
import '../css/index.scss';

const store = configureStore();

function renderApp(App, node) {
  if (!node) return;

  render(
    <AppContainer>
      <App store={store} />
    </AppContainer>,
    node,
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('react-app');

  renderApp(Root, node);

  // Enable Webpack hot module replacement using react-hot-loader.
  if (module.hot) {
    module.hot.accept('./containers/Root', () => {
      renderApp(require('./containers/Root').default, node);
    });
  }
});
