import { PropTypes } from 'react';

const todoActionsShape = PropTypes.shape({
  addTodo: PropTypes.func.isRequired,
  clearCompleteTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  fetchAllTodos: PropTypes.func.isRequired,
  fetchTodo: PropTypes.func.isRequired,
  markAllTodos: PropTypes.func.isRequired,
  markTodo: PropTypes.func.isRequired,
  moveTodo: PropTypes.func.isRequired,
});

export default todoActionsShape;
