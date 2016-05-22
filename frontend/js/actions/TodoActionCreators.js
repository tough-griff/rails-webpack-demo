import Actions from '../constants/Actions';
import fetch from '../utils/fetch';

const SERVER_URL = '/api';

const TodoActionCreators = {
  addTodo(label) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify({
          todo: { label },
        }),
      })
        .then(({ todo }) => dispatch({
          type: Actions.ADD_TODO,
          payload: { todo },
        }))
        .catch(err => dispatch({
          type: Actions.ADD_TODO,
          payload: err,
          error: true,
        }));
  },

  clearCompleteTodos() {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/clear_complete`, {
        method: 'DELETE',
      })
        .then(({ todos }) => dispatch({
          type: Actions.CLEAR_COMPLETE_TODOS,
          payload: { todos },
        }))
        .catch(err => dispatch({
          type: Actions.CLEAR_COMPLETE_TODOS,
          payload: err,
          error: true,
        }));
  },

  deleteTodo(id) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE',
      })
        .then(({ todo }) => dispatch({
          type: Actions.DELETE_TODO,
          payload: { todo },
        }))
        .catch(err => dispatch({
          type: Actions.DELETE_TODO,
          payload: err,
          error: true,
        }));
  },

  editTodo(id, label) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          todo: { label },
        }),
      })
        .then(({ todo }) => dispatch({
          type: Actions.EDIT_TODO,
          payload: { todo },
        }))
        .catch(err => dispatch({
          type: Actions.EDIT_TODO,
          payload: err,
          error: true,
        }));
  },

  fetchAllTodos() {
    return dispatch =>
      fetch(`${SERVER_URL}/todos`, {
        method: 'GET',
      })
        .then(({ todos }) => dispatch({
          type: Actions.FETCH_ALL_TODOS,
          payload: { todos },
        }))
        .catch(err => dispatch({
          type: Actions.FETCH_ALL_TODOS,
          payload: err,
          error: true,
        }));
  },

  markTodo(id, complete) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          todo: { complete },
        }),
      })
        .then(({ todo }) => dispatch({
          type: Actions.MARK_TODO,
          payload: { todo },
        }))
        .catch(err => dispatch({
          type: Actions.MARK_TODO,
          payload: err,
          error: true,
        }));
  },

  markAllTodos(complete) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/mark_all`, {
        method: 'PATCH',
        body: JSON.stringify({ complete }),
      })
        .then(({ todos }) => dispatch({
          type: Actions.MARK_ALL_TODOS,
          payload: { todos },
        }))
        .catch(err => dispatch({
          type: Actions.MARK_ALL_TODOS,
          payload: err,
          error: true,
        }));
  },

  moveTodo(at, to) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/move`, {
        method: 'PATCH',
        body: JSON.stringify({ at, to }),
      })
        .then(({ todos }) => dispatch({
          type: Actions.MOVE_TODO,
          payload: { todos },
        }))
        .catch(err => dispatch({
          type: Actions.MOVE_TODO,
          payload: err,
          error: true,
        }));
  },
};

export default TodoActionCreators;
