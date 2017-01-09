import { List } from 'immutable';
import shortid from 'shortid';

import * as Actions from '../actions/constants';
import Alert from '../records/Alert';
import Application from '../records/Application';
import createReducer from '../utils/createReducer';

/**
 * Returns a properly initialized Alert record.
 */
export function createAlert({ clientId, message, type } = {}) {
  return new Alert({
    clientId: clientId || shortid(),
    message: message || 'An error occurred',
    type: type || 'error',
  });
}

// Define reducer functions to handle each potential action.
const REDUCERS = {
  [Actions.ADD_TODO](state, _payload) {
    return state.set('isLoading', true);
  },

  [Actions.ADD_TODO__END](state, _payload) {
    return state.set('isLoading', false);
  },

  [Actions.ADD_TODO__ERR](state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  [Actions.CLEAR_COMPLETE_TODOS__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.DELETE_TODO__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.EDIT_TODO__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.FETCH_ALL_TODOS](state, _payload) {
    return state.set('isLoading', true);
  },

  [Actions.FETCH_ALL_TODOS__END](state, _payload) {
    return state.set('isLoading', false);
  },

  [Actions.FETCH_ALL_TODOS__ERR](state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  [Actions.FETCH_TODO__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.MARK_ALL_TODOS__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.MARK_TODO__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  [Actions.MOVE_TODO__ERR](state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  // Alert handlers
  [Actions.ADD_ALERT](state, { message, type }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message, type }))
    );
  },

  [Actions.CLEAR_ALERT](state, { clientId }) {
    return state.update('alerts', alerts =>
      alerts.filterNot(alert => alert.get('clientId') === clientId)
    );
  },

  [Actions.CLEAR_ALL_ALERTS](state, _payload) {
    return state.set('alerts', new List());
  },
};

export default createReducer(new Application(), REDUCERS);
