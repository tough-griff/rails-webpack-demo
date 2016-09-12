import camelCase from 'camel-case';
import { List, Record } from 'immutable';

let alertCounter = 0;

// Define an Immutable.js Application Record.
export const Application = new Record({
  alerts: new List(),
  isLoading: false,
});

// Define an Immutable.js Alert Record.
export class Alert extends Record({ clientId: 0, message: '', type: 'notice' }) {
  /**
   * Initialize each Alert with an incrementing `clientId`.
   */
  constructor({ message, type = 'notice' }) {
    super({
      clientId: ++alertCounter,
      message,
      type,
    });
  }
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
        alerts.push(new Alert({ message, type: 'error' }))
      );
  },

  clearCompleteTodosErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  deleteTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  editTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
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
        alerts.push(new Alert({ message, type: 'error' }))
      );
  },

  fetchTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  markAllTodosErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  markTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  moveTodoErr(state, { message }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type: 'error' }))
    );
  },

  // Alert handlers
  addAlert(state, { message, type }) {
    return state.update('alerts', alerts =>
      alerts.push(new Alert({ message, type }))
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
