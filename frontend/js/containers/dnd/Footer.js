import { DropTarget } from 'react-dnd';

import Footer from '../../components/Footer';

const target = {
  canDrop(props, monitor) {
    return monitor.getItem().index < props.maxIndex;
  },

  drop(props, monitor) {
    props.onDrop(monitor.getItem().index);
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
