import Alert from '../records/Alert';
import Application from '../records/Application';
import createReducer from '../utils/createReducer';

let clientIdCounter = 0;

/**
 * Returns a properly initialized Alert record.
 */
export function createAlert({ clientId, message, type } = {}) {
  if (!clientId) clientIdCounter += 1;

  return new Alert({
    clientId: clientId || clientIdCounter,
    message: message || 'An error occurred',
    type: type || 'error',
  });
}

// Define reducer functions to handle each potential action.
const REDUCERS = {
  ADD_TODO(state, _payload) {
    return state.set('isLoading', true);
  },

  ADD_TODO__END(state, _payload) {
    return state.set('isLoading', false);
  },

  ADD_TODO__ERR(state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  CLEAR_COMPLETE_TODOS__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  DELETE_TODO__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  EDIT_TODO__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  FETCH_ALL_TODOS(state, _payload) {
    return state.set('isLoading', true);
  },

  FETCH_ALL_TODOS__END(state, _payload) {
    return state.set('isLoading', false);
  },

  FETCH_ALL_TODOS__ERR(state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  FETCH_TODO__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  MARK_ALL_TODOS__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  MARK_TODO__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  MOVE_TODO__ERR(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  // Alert handlers
  ADD_ALERT(state, { message, type }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message, type }))
    );
  },

  CLEAR_ALERT(state, { clientId }) {
    return state.update('alerts', alerts =>
      alerts.filterNot(alert => alert.get('clientId') === clientId)
    );
  },
};

export default createReducer(new Application(), REDUCERS);
