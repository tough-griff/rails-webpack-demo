import React from 'react';

import AlertList from '../containers/redux/AlertList';
import Header from '../containers/redux/Header';
import TodoList from '../containers/redux/TodoList';

/**
 * Top-level application component. Holds all other application components, and
 * receives props from the router.
 */
function App() {
  return (
    <section className="todoapp">
      <Header />
      <TodoList />
      <AlertList />
    </section>
  );
}

export default App;
