import { map } from 'lodash/fp';
import { List } from 'immutable';

import * as Actions from '../actions/constants';
import Todo from '../records/Todo';
import createReducer from '../utils/createReducer';

/**
 * Returns a new Immutable.js List of Todo Records.
 */
export function createTodoList(todos) {
  const todoRecords = map(t => new Todo(t))(todos);
  return new List(todoRecords);
}

// Define reducer functions to handle each potential action.
const REDUCERS = {
  [Actions.ADD_TODO__END](state, { todo }) {
    return state.push(new Todo(todo));
  },

  [Actions.CLEAR_COMPLETE_TODOS__END](state, { todos }) {
    const removed = createTodoList(todos);

    // Removes todos where the ID is present in the todos list.
    return state.filterNot(todo =>
      removed.some(removedTodo => removedTodo.get('id') === todo.get('id'))
    );
  },

  [Actions.DELETE_TODO__END](state, { todo: { id } }) {
    return state.filterNot(todo => todo.get('id') === id);
  },

  [Actions.EDIT_TODO__END](state, { todo: { id, label } }) {
    const index = state.findIndex(t => t.get('id') === id);

    return state.update(index, todo => todo.set('label', label));
  },

  [Actions.FETCH_ALL_TODOS__END](state, { todos }) {
    return createTodoList(todos);
  },

  [Actions.FETCH_TODO__END](state, { todo }) {
    const newTodo = new Todo(todo);
    const index = state.findIndex(t => t.get('id') === newTodo.get('id'));

    return (index > 0)
      ? state.set(index, newTodo)
      : state.push(newTodo);
  },

  [Actions.MARK_ALL_TODOS__END](state, { todos }) {
    return createTodoList(todos);
  },

  [Actions.MARK_TODO__END](state, { todo: { id, isComplete } }) {
    const index = state.findIndex(t => t.get('id') === id);

    return state.update(index, todo => todo.set('isComplete', isComplete));
  },

  [Actions.MOVE_TODO__END](state, { todos }) {
    return createTodoList(todos);
  },
};

export default createReducer(new List(), REDUCERS);
