import 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';

import { Actions } from '../constants';

const SERVER_URL = '/api';

/**
 * Parse the response's JSON. Throws an error if the response includes a top
 * level `error` key.
 */
function parse(response) {
  const json = response.json();

  return (json.error) ? new Error(json.error) : json;
}

/**
 * Extracts the CSRF token from the page's meta tags.
 */
function getCSRFToken() {
  if (process.env.NODE_ENV === 'test') return 'FAKE_CSRF_TOKEN';

  return document.getElementsByTagName('meta')['csrf-token'].content;
}

export default {
  addTodo(label) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({
          todo: { label },
        }),
      }).then(checkStatus)
        .then(parse)
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

  // FIXME: this is just a stub--does nothing on the server.
  clearCompleteTodos() {
    return {
      type: Actions.CLEAR_COMPLETE_TODOS,
    };
  },

  deleteTodo(id) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
      }).then(checkStatus)
        .then(parse)
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
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({
          todo: { label },
        }),
      }).then(checkStatus)
        .then(parse)
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
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
      }).then(checkStatus)
        .then(parse)
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
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({
          todo: { complete },
        }),
      }).then(checkStatus)
        .then(parse)
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
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': getCSRFToken(),
        },
        body: JSON.stringify({ complete }),
      }).then(checkStatus)
        .then(parse)
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

  // FIXME: this is just a stub--does nothing on the server.
  moveTodo(at, to) {
    return {
      type: Actions.MOVE_TODO,
      payload: { at, to },
    };
  },
};
