import { flow, filter, map, maxBy, sortBy } from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import { Footer, Todo } from '../containers/dnd';
import { todoActionsShape, todoShape } from '../shapes';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete,
};

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
export default class TodoList extends Component {
  static propTypes = {
    actions: todoActionsShape.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
    todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  };

  renderFooter(completeCount) {
    const { actions, todosFilter, todos } = this.props;
    const { clearCompleteTodos, moveTodo } = actions;
    const { length } = todos;

    if (!length) return null;

    const incompleteCount = length - completeCount;
    const { index: maxIndex } = maxBy('index')(todos);

    return (
      <Footer
        clearCompleteTodos={clearCompleteTodos}
        completeCount={completeCount}
        todosFilter={todosFilter}
        incompleteCount={incompleteCount}
        maxIndex={maxIndex}
        moveTodo={moveTodo}
      />
    );
  }

  renderListItems() {
    const { todosFilter, todos } = this.props;

    const listItems = flow(
      filter(FILTERS[todosFilter]),
      sortBy('index'),
      map(this.renderTodo),
    )(todos);

    return (
      <CSSTransitionGroup
        className="todo-list"
        component="ul"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="fade-in"
      >
        {listItems}
      </CSSTransitionGroup>
    );
  }

  renderLoadingIndicator() {
    if (!this.props.isLoading) return null;

    return (
      <div className="loading-indicator">
        Loading&hellip;
      </div>
    );
  }

  renderTodo = (todo) => {
    const { deleteTodo, editTodo, markTodo, moveTodo } = this.props.actions;

    return (
      <Todo
        key={`todo-${todo.id}`}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        markTodo={markTodo}
        moveTodo={moveTodo}
        {...todo}
      />
    );
  };

  renderToggle(completeCount) {
    const { onToggleAll, todos } = this.props;

    return (
      <input
        checked={completeCount === todos.length}
        className="toggle-all"
        onChange={onToggleAll}
        type="checkbox"
      />
    );
  }

  render() {
    const { todos } = this.props;
    const { length: completeCount } = filter('isComplete')(todos);

    return (
      <section className="main">
        {this.renderToggle(completeCount)}
        {this.renderListItems()}
        {this.renderLoadingIndicator()}
        {this.renderFooter(completeCount)}
      </section>
    );
  }
}
