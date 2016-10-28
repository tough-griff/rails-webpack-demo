import { flow, filter, maxBy, sortBy } from 'lodash/fp';
import { createSelector } from 'reselect';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete,
};

const getTodos = createSelector(
  state => state.get('todos'),
  todos => todos.toJS(),
);

export const getFilteredTodos = createSelector(
  getTodos,
  (_state, props) => props.todosFilter,
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
