import { connect } from 'react-redux';

import TodoList from '../dnd/TodoList';
import * as TodoActionCreators from '../../actions/TodoActionCreators';
import * as selectors from '../../selectors';

function mapStateToProps(state, props) {
  return {
    completeCount: selectors.getCompleteCount(state),
    count: selectors.getCount(state),
    isLoading: state.application.toJS().isLoading,
    maxIndex: selectors.getMaxIndex(state),
    todos: selectors.getFilteredTodos(state, props),
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
