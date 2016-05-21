import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TodoActions from '../../actions/TodoActions';
import { App } from '../dnd';

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
