import fetch from '../utils/fetch';

const SERVER_PATH = '/api';
const markAllTodosPath = () => `${SERVER_PATH}/todos/mark_all`;
const moveTodosPath = () => `${SERVER_PATH}/todos/move`;
const clearCompleteTodosPath = () => `${SERVER_PATH}/todos/clear_complete`;
const todosPath = () => `${SERVER_PATH}/todos`;
const todoPath = id => `${SERVER_PATH}/todos/${id}`;

function take(key) {
  return res => res[key];
}

const TodoApi = {
  index() {
    return fetch.get(todosPath())
      .then(take('todos'));
  },

  create(todo) {
    return fetch.post(todosPath(), {
      body: JSON.stringify({ todo }),
    }).then(take('todo'));
  },

  show(id) {
    return fetch.get(todoPath(id))
      .then(take('todo'));
  },

  update(id, todo) {
    return fetch.patch(todoPath(id), {
      body: JSON.stringify({ todo }),
    }).then(take('todo'));
  },

  destroy(id) {
    return fetch.delete(todoPath(id))
      .then(take('todo'));
  },

  markAll(complete) {
    return fetch.patch(markAllTodosPath(), {
      body: JSON.stringify({ complete }),
    }).then(take('todos'));
  },

  move(at, to) {
    return fetch.patch(moveTodosPath(), {
      body: JSON.stringify({ at, to }),
    }).then(take('todos'));
  },

  clearComplete() {
    return fetch.delete(clearCompleteTodosPath())
      .then(take('todos'));
  },
};

export default TodoApi;
