import React, { PropTypes } from 'react';

import HeaderContainer from '../containers/redux/HeaderContainer';
import TodoListContainer from '../containers/redux/TodoListContainer';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
function App({ location }) {
  const todosFilter = location.pathname.replace('/', '');

  return (
    <section className="todoapp">
      <HeaderContainer />
      <TodoListContainer todosFilter={todosFilter} />
    </section>
  );
}

App.propTypes = {
  location: PropTypes.object.isRequired,
};

export default App;
