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
  addTodoEnd(state, { todo }) {
    return state.push(new Todo(todo));
  },

  clearCompleteTodosEnd(state, { todos: removedTodos }) {
    const removed = createTodoList(removedTodos);

    // Removes todos where the ID is present in the removedTodos list.
    return state.filterNot(todo =>
      removed.some(removedTodo => removedTodo.get('id') === todo.get('id'))
    );
  },

  deleteTodoEnd(state, { todo: { id } }) {
    return state.filterNot(todo => todo.get('id') === id);
  },

  editTodoEnd(state, { todo: { id, label } }) {
    return state.map(todo => (
      (todo.get('id') === id)
        ? todo.set('label', label)
        : todo
    ));
  },

  fetchAllTodosEnd(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  fetchTodoEnd(state, { todo }) {
    const newTodo = new Todo(todo);
    const index = state.findIndex(t => t.get('id') === newTodo.get('id'));

    return (index > 0)
      ? state.set(index, newTodo)
      : state.push(newTodo);
  },

  markAllTodosEnd(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },

  markTodoEnd(state, { todo: { id, isComplete } }) {
    return state.map(todo => (
      (todo.get('id') === id)
        ? todo.set('isComplete', isComplete)
        : todo
    ));
  },

  moveTodoEnd(state, { todos: allTodos }) {
    return createTodoList(allTodos);
  },
};

/**
 * If the action type corresponds to a handler in REDUCERS, return a
 * reduction of the state. If no corresponding action is found, simply pass
 * the state through.
 */
export default function todos(state = new List(), { payload, type }) {
  const reducer = REDUCERS[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}
