import camelCase from 'camel-case';
import { List, Record } from 'immutable';

// Define an Immutable.js Application Record.
export const Application = new Record({
  isLoading: false,
  errors: new List(),
});

// Define reducer functions to handle each potential action.
const REDUCERS = {
  addTodo(state, _payload) {
    return state.set('isLoading', true);
  },

  addTodoEnd(state, _payload) {
    return state.set('isLoading', false);
  },

  addTodoErr(state, payload) {
    return state.set('isLoading', false)
      .update('errors', errors => errors.push(payload));
  },

  fetchAllTodos(state, _payload) {
    return state.set('isLoading', true);
  },

  fetchAllTodosEnd(state, _payload) {
    return state.set('isLoading', false);
  },

  fetchAllTodosErr(state, payload) {
    return state.set('isLoading', false)
      .update('errors', errors => errors.push(payload));
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
