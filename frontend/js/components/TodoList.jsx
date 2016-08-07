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
    todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
  };

  onToggle = (evt) => {
    this.props.actions.markAllTodos(evt.target.checked);
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

    return flow(
      filter(FILTERS[todosFilter]),
      sortBy('index'),
      map(this.renderTodo),
    )(todos);
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
    return (
      <input
        checked={completeCount === this.props.todos.length}
        className="toggle-all"
        onChange={this.onToggle}
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
        <CSSTransitionGroup
          className="todo-list"
          component="ul"
          transitionEnterTimeout={250}
          transitionLeaveTimeout={250}
          transitionName="fade-in"
        >
          {this.renderListItems()}
        </CSSTransitionGroup>
        {this.renderLoadingIndicator()}
        {this.renderFooter(completeCount)}
      </section>
    );
  }
}
