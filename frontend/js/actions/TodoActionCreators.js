export function addTodo(label) {
  return {
    type: 'ADD_TODO',
    payload: { label },
  };
}

export function clearCompleteTodos() {
  return {
    type: 'CLEAR_COMPLETE_TODOS',
  };
}

export function deleteTodo(id) {
  return {
    type: 'DELETE_TODO',
    payload: { id },
  };
}

export function editTodo(id, label) {
  return {
    type: 'EDIT_TODO',
    payload: { id, label },
  };
}

export function fetchAllTodos() {
  return {
    type: 'FETCH_ALL_TODOS',
  };
}

export function fetchTodo(id) {
  return {
    type: 'FETCH_TODO',
    payload: { id },
  };
}

export function markAllTodos(complete) {
  return {
    type: 'MARK_ALL_TODOS',
    payload: { complete },
  };
}

export function markTodo(id, complete) {
  return {
    type: 'MARK_TODO',
    payload: { id, complete },
  };
}

export function moveTodo(at, to) {
  return {
    type: 'MOVE_TODO',
    payload: { at, to },
  };
}
