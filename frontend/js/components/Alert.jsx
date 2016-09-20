import cx from 'classnames';
import React, { PropTypes } from 'react';

import { alertPropTypes } from '../shapes';

function Alert({ message, onClick, type }) {
  const className = cx('alert', type);

  return (
    <li className={className}>
      <span className="message">{message}</span>
      <button className="close" onClick={onClick}>
        &times;
      </button>
    </li>
  );
}

Alert.propTypes = {
  ...alertPropTypes,
  onClick: PropTypes.func.isRequired,
};

export default Alert;
