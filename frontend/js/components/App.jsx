import React, { PropTypes } from 'react';

import AlertList from '../containers/redux/AlertList';
import Header from '../containers/redux/Header';
import TodoList from '../containers/redux/TodoList';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
function App({ location }) {
  const todosFilter = location.pathname.replace('/', '');

  return (
    <section className="todoapp">
      <Header />
      <TodoList todosFilter={todosFilter} />
      <AlertList />
    </section>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
