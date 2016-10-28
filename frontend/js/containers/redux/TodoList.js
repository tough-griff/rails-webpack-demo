import { connect } from 'react-redux';

import TodoList from '../dnd/TodoList';
import { fetchAllTodos, markAllTodos } from '../../actions/TodoActionCreators';
import { getIsLoading } from '../../selectors/applicationSelectors';
import { getCompleteCount, getCount, getFilteredTodos } from '../../selectors/todoSelectors';

function mapStateToProps(state, props) {
  return {
    completeCount: getCompleteCount(state),
    count: getCount(state),
    isLoading: getIsLoading(state),
    todos: getFilteredTodos(state, props),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMount: () => dispatch(fetchAllTodos()),

    onToggleAll: (evt) => {
      dispatch(markAllTodos(evt.target.checked));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
