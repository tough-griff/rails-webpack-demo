import client from '../utils/apiClient';

const markAllTodosPath = () => '/todos/mark_all';
const moveTodosPath = () => '/todos/move';
const clearCompleteTodosPath = () => '/todos/clear_complete';
const todosPath = () => '/todos';
const todoPath = id => `/todos/${id}`;

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
