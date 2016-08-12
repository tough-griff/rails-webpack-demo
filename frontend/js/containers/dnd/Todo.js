import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'lodash/fp';

import Todo from '../../components/Todo';

const target = {
  canDrop(props, monitor) {
    const { index } = props;
    const draggedIndex = monitor.getItem().index;

    return draggedIndex !== index && draggedIndex !== index - 1;
  },

  drop(props, monitor) {
    const { index, moveTodo } = props;
    moveTodo(monitor.getItem().index, index);
  },
};

const source = {
  beginDrag(props) {
    return { index: props.index };
  },
};

function targetCollect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

export default compose(
  DropTarget('DND__TODO', target, targetCollect),
  DragSource('DND__TODO', source, sourceCollect),
)(Todo);
