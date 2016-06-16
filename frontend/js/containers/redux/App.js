import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import App from '../dnd/App';
import TodoActionCreators from '../../actions/TodoActionCreators';

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
