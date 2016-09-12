import React, { PropTypes } from 'react';

function ClearButton({ onClick }) {
  return (
    <button className="clear-completed" onClick={onClick}>
      Clear complete
    </button>
  );
}

ClearButton.propTypes = { onClick: PropTypes.func.isRequired };

export default ClearButton;
