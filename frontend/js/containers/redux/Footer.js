import { connect } from 'react-redux';

import Footer from '../dnd/Footer';
import { clearCompleteTodos, moveTodo } from '../../actions/TodoActionCreators';
import { getMaxIndex } from '../../selectors/todoSelectors';


function mapStateToProps(state) {
  return {
    maxIndex: getMaxIndex(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClick: () => dispatch(clearCompleteTodos()),

    onDrop: (at, to) => {
      dispatch(moveTodo(at, to));
    },
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,

    onDrop: (droppedIndex) => {
      dispatchProps.onDrop(droppedIndex, stateProps.maxIndex + 1);
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Footer);
