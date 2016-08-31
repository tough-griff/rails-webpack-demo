import { connect } from 'react-redux';

import { addTodo, fetchAllTodos } from '../../actions/TodoActionCreators';
import Header from '../../components/Header';

function mapDispatchToProps(dispatch) {
  return {
    onDoubleClick: () => dispatch(fetchAllTodos()),

    onSave: (label) => {
      if (!label.length) return;

      dispatch(addTodo(label));
    },
  };
}

export default connect(null, mapDispatchToProps)(Header);
