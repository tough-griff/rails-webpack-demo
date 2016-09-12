import { connect } from 'react-redux';

import TodoList from '../dnd/TodoList';
import * as TodoActionCreators from '../../actions/TodoActionCreators';

function mapStateToProps(state) {
  const todosFilter = state.routing.locationBeforeTransitions.pathname
    .replace('/', '');

  return {
    isLoading: state.application.toJS().isLoading,
    todos: state.todos.toJS(),
    todosFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => dispatch(TodoActionCreators.fetchAllTodos()),

    onToggleAll: (evt) => {
      dispatch(TodoActionCreators.markAllTodos(evt.target.checked));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);