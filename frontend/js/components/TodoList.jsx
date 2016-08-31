import { flow, filter, map, maxBy, sortBy } from 'lodash/fp';
import React, { Component, PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Footer from '../containers/redux/Footer';
import Todo from '../containers/redux/Todo';
import { todoShape } from '../shapes';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete,
};

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 *
 * @todo could we move some of the logic in this component to `mapStateToProps`
 *   in the container? Perhaps the `Footer` container?
 */
export default class TodoList extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onMount: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
    todosFilter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
  };

  componentDidMount() {
    this.props.onMount();
  }

  renderFooter(completeCount) {
    const { todosFilter, todos } = this.props;
    const { length } = todos;

    if (!length) return null;

    const incompleteCount = length - completeCount;
    const { index: maxIndex } = maxBy('index')(todos);

    return (
      <Footer
        completeCount={completeCount}
        todosFilter={todosFilter}
        incompleteCount={incompleteCount}
        maxIndex={maxIndex}
      />
    );
  }

  renderListItems() {
    const { todosFilter, todos } = this.props;

    const listItems = flow(
      filter(FILTERS[todosFilter]),
      sortBy('index'),
      map(todo => <Todo key={`todo-${todo.id}`} {...todo} />),
    )(todos);

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
