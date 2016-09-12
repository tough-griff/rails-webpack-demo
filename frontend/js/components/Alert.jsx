import cx from 'classnames';
import React, { PropTypes } from 'react';

function Alert({ message, onClick, type }) {
  const className = cx('alert', type);

  return (
    <li className={className} onClick={onClick}>
      {message}
    </li>
  );
}

Alert.propTypes = {
  clientId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['error', 'notice']).isRequired,
};

export default Alert;
