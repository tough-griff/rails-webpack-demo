import { connect } from 'react-redux';

import Todo from '../dnd/Todo';
import { deleteTodo, editTodo, markTodo, moveTodo } from '../../actions/TodoActionCreators';

function mapDispatchToProps(dispatch, props) {
  return {
    onChange: () => {
      const { id, isComplete } = props;

      dispatch(markTodo(id, !isComplete));
    },

    onClick: () => dispatch(deleteTodo(props.id)),

    onDrop: (droppedIndex) => {
      dispatch(moveTodo(droppedIndex, props.index));
    },

    onSave: (newLabel) => {
      const { id, label } = props;

      if (newLabel.length) {
        if (newLabel !== label) dispatch(editTodo(id, newLabel));
      } else {
        dispatch(deleteTodo(id));
      }

      this.setState({
        isEditing: false,
      });
    },
  };
}

export default connect(null, mapDispatchToProps)(Todo);
