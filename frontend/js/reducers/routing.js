// Configure react-router to work with redux-immutable.
// see https://github.com/gajus/redux-immutable#using-with-react-router-redux
import { Record } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import createReducer from '../utils/createReducer';

export const Routing = new Record({
  locationBeforeTransitions: null,
}, 'Routing');

const REDUCERS = {
  [LOCATION_CHANGE](state, payload) {
    return state.set('locationBeforeTransitions', payload);
  },
};

export default createReducer(new Routing(), REDUCERS);
