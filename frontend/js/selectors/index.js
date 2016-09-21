import { flow, filter, maxBy, sortBy } from 'lodash/fp';
import { createSelector } from 'reselect';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete,
};

const getTodos = state => state.todos.toJS();
const getTodosFilter = (_state, props) => props.todosFilter;

export const getFilteredTodos = createSelector(
  getTodos,
  getTodosFilter,
  (todos, todosFilter) => flow(
    filter(FILTERS[todosFilter]),
    sortBy('index'),
  )(todos),
);

export const getCount = createSelector(
  getTodos,
  todos => todos.length,
);

export const getCompleteCount = createSelector(
  getTodos,
  todos => filter(FILTERS.completed)(todos).length,
);

export const getMaxIndex = createSelector(
  getTodos,
  todos => (maxBy('index')(todos) || { index: 0 }).index,
);
