import { Record } from 'immutable';

const Todo = new Record({
  createdAt: '1970-01-01T00:00:00.000Z',
  id: 0,
  index: 0,
  isComplete: false,
  label: 'todo',
  updatedAt: '1970-01-01T00:00:00.000Z',
}, 'Todo');

export default Todo;
