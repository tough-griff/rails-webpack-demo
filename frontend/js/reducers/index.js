import { combineReducers } from 'redux';

import application from './application';
import todos from './todos';

export default combineReducers({
  application,
  todos,
});

export { todos };
