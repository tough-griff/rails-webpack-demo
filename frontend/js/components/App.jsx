import React, { Component, PropTypes } from 'react';

import Header from './Header';
import TodoList from './TodoList';
import todoShape from '../shapes/todoShape';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.arrayOf(todoShape).isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, location, todos } = this.props;
    const { addTodo, fetchAllTodos } = actions;
    const filter = location.pathname.replace('/', '');

    return (
      <div>
        <Header
          addTodo={addTodo}
          fetchAllTodos={fetchAllTodos}
        />
        <TodoList
          actions={actions}
          filter={filter}
          todos={todos}
        />
      </div>
    );
  }
}
