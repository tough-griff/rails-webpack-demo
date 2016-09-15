import camelCase from 'camel-case';
import { List, Record } from 'immutable';

let clientIdCounter = 0;

// Define an Immutable.js Application Record.
export const Application = new Record({
  alerts: new List(),
  isLoading: false,
});

// Define an Immutable.js Alert Record.
export const Alert = new Record({
  clientId: 0,
  message: '',
  type: 'error',
});

/**
 * Returns a properly initialized Alert record.
 */
export function createAlert({ clientId, message, type } = {}) {
  return new Alert({
    clientId: clientId || clientIdCounter++,
    message: message || 'An error occurred',
    type: type || 'error',
  });
}

// Define reducer functions to handle each potential action.
const REDUCERS = {
  addTodo(state, _payload) {
    return state.set('isLoading', true);
  },

  addTodoEnd(state, _payload) {
    return state.set('isLoading', false);
  },

  addTodoErr(state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  clearCompleteTodosErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  deleteTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  editTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  fetchAllTodos(state, _payload) {
    return state.set('isLoading', true);
  },

  fetchAllTodosEnd(state, _payload) {
    return state.set('isLoading', false);
  },

  fetchAllTodosErr(state, { message }) {
    return state.set('isLoading', false)
      .update('alerts', alerts =>
        alerts.push(createAlert({ message }))
      );
  },

  fetchTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  markAllTodosErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  markTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  moveTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message }))
    );
  },

  // Alert handlers
  addAlert(state, { message, type }) {
    return state.update('alerts', alerts =>
      alerts.push(createAlert({ message, type }))
    );
  },

  clearAlert(state, { clientId }) {
    return state.update('alerts', alerts =>
      alerts.filterNot(alert => alert.get('clientId') === clientId)
    );
  },
};

/**
 * If the action type corresponds to a handler in REDUCERS, return a
 * reduction of the state. If no corresponding action is found, simply pass
 * the state through.
 */
export default function application(state = new Application(), { payload, type }) {
  const reducer = REDUCERS[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}
