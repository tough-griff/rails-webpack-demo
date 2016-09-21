import { map } from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Footer from '../containers/redux/Footer';
import Todo from '../containers/redux/Todo';
import { todoShape } from '../shapes';

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
export default class TodoList extends Component {
  static propTypes = {
    completeCount: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    maxIndex: PropTypes.number.isRequired,
    onMount: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
    todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  };

  componentDidMount() {
    this.props.onMount();
  }

  renderFooter() {
    const { completeCount, count, maxIndex, todosFilter } = this.props;

    if (!count) return null;

    return (
      <Footer
        completeCount={completeCount}
        count={count}
        maxIndex={maxIndex}
        todosFilter={todosFilter}
      />
    );
  }

  renderListItems() {
    const listItems = map(todo =>
      <Todo key={`todo-${todo.id}`} {...todo} />
    )(this.props.todos);

    return (
      <CSSTransitionGroup
        className="todo-list"
        component="ul"
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}
        transitionName="fade"
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

  renderToggle() {
    const { completeCount, count, onToggleAll } = this.props;

    return (
      <input
        checked={completeCount === count}
        className="toggle-all"
        onChange={onToggleAll}
        type="checkbox"
      />
    );
  }

  render() {
    return (
      <section className="main">
        {this.renderToggle()}
        {this.renderListItems()}
        {this.renderLoadingIndicator()}
        {this.renderFooter()}
      </section>
    );
  }
}
