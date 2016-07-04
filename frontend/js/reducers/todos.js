import camelCase from 'camel-case';
import { List, Record, Seq } from 'immutable';

// Define an Immutable.js Todo Record.
export const Todo = new Record({
  id: 0,
  index: 0,
  isComplete: false,
  label: 'todo',
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
  addTodo(state, { todo }) {
    return state.push(new Todo(todo));
  },

  clearCompleteTodos(state, { todos: removedTodos }) {
    const removed = createTodoList(removedTodos);

    // Removes todos where the ID is present in the removedTodos list.
    return state.filterNot(todo =>
      removed.some(removedTodo => removedTodo.get('id') === todo.get('id'))
    );
  },

  deleteTodo(state, { todo: { id } }) {
    return state.filterNot(todo => todo.get('id') === id);
  },

  editTodo(state, { todo: { id, label } }) {
    return state.map(todo => (
      (todo.get('id') === id)
        ? todo.set('label', label)
        : todo
    ));
  },

  fetchAllTodos(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  fetchTodo(state, { todo }) {
    const newTodo = new Todo(todo);
    const index = state.findIndex(t => t.get('id') === newTodo.get('id'));

    return (index > 0)
      ? state.set(index, newTodo)
      : state.push(newTodo);
  },

  markAllTodos(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  markTodo(state, { todo: { id, isComplete } }) {
    return state.map(todo => (
      (todo.get('id') === id)
        ? todo.set('isComplete', isComplete)
        : todo
    ));
  },

  moveTodo(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },
};

// Define the default, initial state.
const initialState = new List();

/**
 * If the action type corresponds to a handler in REDUCERS, return a
 * reduction of the state. If no corresponding action is found, simply pass
 * the state through.
 */
export default function todos(state = initialState, { error, payload, type }) {
  if (error) {
    console.error(`${type}: ${payload}`); // eslint-disable-line no-console
    return state;
  }

  const reducer = REDUCERS[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}
