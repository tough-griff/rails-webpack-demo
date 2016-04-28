import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from './Header';
import TodoList from './TodoList';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
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

export default DragDropContext(HTML5Backend)(App);
