import React from 'react';
import { Redirect, Route } from 'react-router';

import App from './components/App';

export default (
  <Route component={App}>
    <Route path="all" />
    <Route path="active" />
    <Route path="completed" />
    <Redirect from="/" to="all" />
  </Route>
);
