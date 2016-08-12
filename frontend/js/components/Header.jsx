import React, { PropTypes } from 'react';

import TextInput from './TextInput';

function Header({ onDoubleClick, onSave }) {
  return (
    <header className="header">
      <h1 onDoubleClick={onDoubleClick}>
        Todos
      </h1>
      <TextInput
        className="new-todo"
        onSave={onSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
}

Header.propTypes = {
  onDoubleClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Header;
