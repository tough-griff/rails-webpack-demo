import * as Actions from './constants';

export function addTodo(label) {
  return {
    type: Actions.ADD_TODO,
    payload: { label },
  };
}

export function clearCompleteTodos() {
  return {
    type: Actions.CLEAR_COMPLETE_TODOS,
  };
}

export function deleteTodo(id) {
  return {
    type: Actions.DELETE_TODO,
    payload: { id },
  };
}

export function editTodo(id, label) {
  return {
    type: Actions.EDIT_TODO,
    payload: { id, label },
  };
}

export function fetchAllTodos() {
  return {
    type: Actions.FETCH_ALL_TODOS,
  };
}

export function fetchTodo(id) {
  return {
    type: Actions.FETCH_TODO,
    payload: { id },
  };
}

export function markAllTodos(complete) {
  return {
    type: Actions.MARK_ALL_TODOS,
    payload: { complete },
  };
}

export function markTodo(id, complete) {
  return {
    type: Actions.MARK_TODO,
    payload: { id, complete },
  };
}

export function moveTodo(at, to) {
  return {
    type: Actions.MOVE_TODO,
    payload: { at, to },
  };
}
