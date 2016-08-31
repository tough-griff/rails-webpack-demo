import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoList from '../dnd/TodoList';
import * as TodoActionCreators from '../../actions/TodoActionCreators';

function mapStateToProps(state) {
  return {
    ...state.application.toJS(),
    todos: state.todos.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActionCreators, dispatch),

    onMount: () => dispatch(TodoActionCreators.fetchAllTodos()),

    onToggleAll: (evt) => {
      dispatch(TodoActionCreators.markAllTodos(evt.target.checked));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
