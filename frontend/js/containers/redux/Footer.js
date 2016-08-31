import { connect } from 'react-redux';

import Footer from '../dnd/Footer';
import { clearCompleteTodos, moveTodo } from '../../actions/TodoActionCreators';

function mapDispatchToProps(dispatch, props) {
  return {
    onClick: () => dispatch(clearCompleteTodos()),

    onDrop: (droppedIndex) => {
      dispatch(moveTodo(droppedIndex, props.maxIndex + 1));
    },
  };
}

export default connect(null, mapDispatchToProps)(Footer);
