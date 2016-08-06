import fetch from '../utils/fetch';

const SERVER_URL = '/api';
const todosPath = `${SERVER_URL}/todos`;
const todoPath = id => `${SERVER_URL}/todos/${id}`;

const TodoApi = {
  index() {
    return fetch(todosPath, {
      method: 'GET',
    }).then(res => res.todos);
  },

  create(todo) {
    return fetch(todosPath, {
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
    return fetch(`${SERVER_URL}/todos/mark_all`, {
      method: 'PATCH',
      body: JSON.stringify({ complete }),
    }).then(res => res.todos);
  },

  move(at, to) {
    return fetch(`${SERVER_URL}/todos/move`, {
      method: 'PATCH',
      body: JSON.stringify({ at, to }),
    }).then(res => res.todos);
  },

  clearComplete() {
    return fetch(`${SERVER_URL}/todos/clear_complete`, {
      method: 'DELETE',
    }).then(res => res.todos);
  },
};

export default TodoApi;
