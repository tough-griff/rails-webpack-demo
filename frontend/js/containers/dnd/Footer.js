import { DropTarget } from 'react-dnd';

import Footer from '../../components/Footer';

const target = {
  canDrop(props, monitor) {
    return monitor.getItem().index < props.maxIndex;
  },

  drop(props, monitor) {
    const { moveTodo, maxIndex } = props;
    moveTodo(monitor.getItem().index, maxIndex + 1);
  },
};

function collect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

export default DropTarget('DND__TODO', target, collect)(Footer);
