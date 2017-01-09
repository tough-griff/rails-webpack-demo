import React, { PropTypes } from 'react';

import AlertList from '../containers/redux/AlertList';
import Header from '../containers/redux/Header';
import TodoList from '../containers/redux/TodoList';

/**
 * Top-level application component. Holds all other application components, and
 * receives params from the router.
 */
function App({ params }) {
  return (
    <section className="todoapp">
      <Header />
      <TodoList todosFilter={params.filter} />
      <AlertList />
    </section>
  );
}

App.propTypes = {
  params: PropTypes.shape({
    filter: PropTypes.oneOf(['all', 'active', 'completed']),
  }).isRequired,
};

export default App;
