import fetch from '../utils/fetch';

const SERVER_PATH = '/api';
const markAllTodosPath = () => `${SERVER_PATH}/todos/mark_all`;
const moveTodosPath = () => `${SERVER_PATH}/todos/move`;
const clearCompleteTodosPath = () => `${SERVER_PATH}/todos/clear_complete`;
const todosPath = () => `${SERVER_PATH}/todos`;
const todoPath = id => `${SERVER_PATH}/todos/${id}`;

const TodoApi = {
  index() {
    return fetch(todosPath(), {
      method: 'GET',
    }).then(res => res.todos);
  },

  create(todo) {
    return fetch(todosPath(), {
      method: 'POST',
      body: JSON.stringify({ todo }),
    }).then(res => res.todo);
  },

  show(id) {
    return fetch(todoPath(id), {
      method: 'GET',
    }).then(res => res.todo);
  },

  update(id, todo) {
    return fetch(todoPath(id), {
      method: 'PATCH',
      body: JSON.stringify({ todo }),
    }).then(res => res.todo);
  },

  destroy(id) {
    return fetch(todoPath(id), {
      method: 'DELETE',
    }).then(res => res.todo);
  },

  markAll(complete) {
    return fetch(markAllTodosPath(), {
      method: 'PATCH',
      body: JSON.stringify({ complete }),
    }).then(res => res.todos);
  },

  move(at, to) {
    return fetch(moveTodosPath(), {
      method: 'PATCH',
      body: JSON.stringify({ at, to }),
    }).then(res => res.todos);
  },

  clearComplete() {
    return fetch(clearCompleteTodosPath(), {
      method: 'DELETE',
    }).then(res => res.todos);
  },
};

export default TodoApi;
