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
    location: PropTypes.object.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, location, todos } = this.props;
    const { addTodo, fetchAllTodos } = actions;
    const todosFilter = location.pathname.replace('/', '');

    return (
      <div>
        <Header
          addTodo={addTodo}
          fetchAllTodos={fetchAllTodos}
        />
        <TodoList
          actions={actions}
          todosFilter={todosFilter}
          todos={todos}
        />
      </div>
    );
  }
}
