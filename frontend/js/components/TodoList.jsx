import _ from 'lodash';
import React, { Component, PropTypes } from 'react';

import { Footer, Todo } from '../containers/dnd';
import todoShape from '../shapes/todoShape';

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
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
  };

  onToggle = (evt) => {
    this.props.actions.markAllTodos(evt.target.checked);
  };

  renderFooter(completeCount) {
    const { actions, filter, todos } = this.props;
    const { clearCompleteTodos, moveTodo } = actions;
    const { length } = todos;

    if (!length) return null;

    const incompleteCount = length - completeCount;
    const { index } = _.maxBy(todos, 'index');

    return (
      <Footer
        clearCompleteTodos={clearCompleteTodos}
        completeCount={completeCount}
        filter={filter}
        incompleteCount={incompleteCount}
        maxIndex={index}
        moveTodo={moveTodo}
      />
    );
  }

  renderListItems() {
    const { filter, todos } = this.props;

    return _(todos)
      .filter(FILTERS[filter])
      .sortBy('index')
      .map(this.renderTodo)
      .value();
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
    const completeCount = _(todos).filter('isComplete').size();

    return (
      <section className="main">
        {this.renderToggle(completeCount)}
        <ul className="todo-list">
          {this.renderListItems()}
        </ul>
        {this.renderFooter(completeCount)}
      </section>
    );
  }
}
