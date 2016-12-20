import { combineReducers } from 'redux-immutable';

import application from './application';
import routing from './routing';
import todos from './todos';

export default combineReducers({
  application,
  routing,
  todos,
});

export {
  application,
  routing,
  todos,
};
