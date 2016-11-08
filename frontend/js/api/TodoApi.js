import client from '../utils/apiClient';

const SERVER_PATH = '/api';
const markAllTodosPath = () => `${SERVER_PATH}/todos/mark_all`;
const moveTodosPath = () => `${SERVER_PATH}/todos/move`;
const clearCompleteTodosPath = () => `${SERVER_PATH}/todos/clear_complete`;
const todosPath = () => `${SERVER_PATH}/todos`;
const todoPath = id => `${SERVER_PATH}/todos/${id}`;

function take(key) {
  return res => res.data[key];
}

const TodoApi = {
  index() {
    return client.get(todosPath())
      .then(take('todos'));
  },

  create(todo) {
    return client.post(todosPath(), { todo })
      .then(take('todo'));
  },

  show(id) {
    return client.get(todoPath(id))
      .then(take('todo'));
  },

  update(id, todo) {
    return client.patch(todoPath(id), { todo })
      .then(take('todo'));
  },

  destroy(id) {
    return client.delete(todoPath(id))
      .then(take('todo'));
  },

  markAll(complete) {
    return client.patch(markAllTodosPath(), { complete })
      .then(take('todos'));
  },

  move(at, to) {
    return client.patch(moveTodosPath(), { at, to })
      .then(take('todos'));
  },

  clearComplete() {
    return client.delete(clearCompleteTodosPath())
      .then(take('todos'));
  },
};

export default TodoApi;
