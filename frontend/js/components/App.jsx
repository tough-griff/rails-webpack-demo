import React, { Component, PropTypes } from 'react';

import Header from './Header';
import TodoList from './TodoList';
import { todoActionsShape, todoShape } from '../shapes';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
export default class App extends Component {
  static propTypes = {
    actions: todoActionsShape.isRequired,
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, isLoading, location, todos } = this.props;
    const { addTodo, fetchAllTodos } = actions;
    const todosFilter = location.pathname.replace('/', '');

    return (
      <section className="todoapp">
        <Header
          addTodo={addTodo}
          fetchAllTodos={fetchAllTodos}
        />
        <TodoList
          actions={actions}
          isLoading={isLoading}
          todosFilter={todosFilter}
          todos={todos}
        />
      </section>
    );
  }
}
