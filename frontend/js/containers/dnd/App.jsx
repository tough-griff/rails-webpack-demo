import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import App from '../../components/App';

export default DragDropContext(HTML5Backend)(App);
