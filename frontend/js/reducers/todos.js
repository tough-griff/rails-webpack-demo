import { List, Record, Seq } from 'immutable';

import createReducer from '../utils/createReducer';

// Define an Immutable.js Todo Record.
export const Todo = new Record({
  createdAt: '1970-01-01T00:00:00.000Z',
  id: 0,
  index: 0,
  isComplete: false,
  label: 'todo',
  updatedAt: '1970-01-01T00:00:00.000Z',
});

/**
 * Returns a new Immutable.js List of Todo Records.
 */
export function createTodoList(newTodos) {
  return new Seq(newTodos)
    .map(todo => new Todo(todo))
    .toList();
}

// Define reducer functions to handle each potential action.
const REDUCERS = {
  ADD_TODO__END(state, { todo }) {
    return state.push(new Todo(todo));
  },

  CLEAR_COMPLETE_TODOS__END(state, { todos: removedTodos }) {
    const removed = createTodoList(removedTodos);

    // Removes todos where the ID is present in the removedTodos list.
    return state.filterNot(todo =>
      removed.some(removedTodo => removedTodo.get('id') === todo.get('id'))
    );
  },

  DELETE_TODO__END(state, { todo: { id } }) {
    return state.filterNot(todo => todo.get('id') === id);
  },

  EDIT_TODO__END(state, { todo: { id, label } }) {
    const index = state.findIndex(t => t.get('id') === id);

    return state.update(index, todo => todo.set('label', label));
  },

  FETCH_ALL_TODOS__END(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  FETCH_TODO__END(state, { todo }) {
    const newTodo = new Todo(todo);
    const index = state.findIndex(t => t.get('id') === newTodo.get('id'));

    return (index > 0)
      ? state.set(index, newTodo)
      : state.push(newTodo);
  },

  MARK_ALL_TODOS__END(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  MARK_TODO__END(state, { todo: { id, isComplete } }) {
    const index = state.findIndex(t => t.get('id') === id);

    return state.update(index, todo => todo.set('isComplete', isComplete));
  },

  MOVE_TODO__END(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },
};

export default createReducer(new List(), REDUCERS);
