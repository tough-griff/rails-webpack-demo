import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoActionCreators from '../../actions/TodoActionCreators';
import { App } from '../dnd';

function mapStateToProps(state) {
  return {
    todos: state.todos.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActionCreators, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
