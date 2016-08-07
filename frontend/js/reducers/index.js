import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import application from './application';
import todos from './todos';

export default combineReducers({
  application,
  routing,
  todos,
});

export { todos };
