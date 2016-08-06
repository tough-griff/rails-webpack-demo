const TodoActionCreators = {
  addTodo(label) {
    return {
      type: 'ADD_TODO',
      payload: { label },
    };
  },

  clearCompleteTodos() {
    return {
      type: 'CLEAR_COMPLETE_TODOS',
    };
  },

  deleteTodo(id) {
    return {
      type: 'DELETE_TODO',
      payload: { id },
    };
  },

  editTodo(id, label) {
    return {
      type: 'EDIT_TODO',
      payload: { id, label },
    };
  },

  fetchAllTodos() {
    return {
      type: 'FETCH_ALL_TODOS',
    };
  },

  fetchTodo(id) {
    return {
      type: 'FETCH_TODO',
      payload: { id },
    };
  },

  markAllTodos(complete) {
    return {
      type: 'MARK_ALL_TODOS',
      payload: { complete },
    };
  },

  markTodo(id, complete) {
    return {
      type: 'MARK_TODO',
      payload: { id, complete },
    };
  },

  moveTodo(at, to) {
    return {
      type: 'MOVE_TODO',
      payload: { at, to },
    };
  },
};

export default TodoActionCreators;
