import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import TodoList from '../../components/TodoList';

export default DragDropContext(HTML5Backend)(TodoList);
