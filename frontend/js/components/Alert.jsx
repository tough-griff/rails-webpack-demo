import cx from 'classnames';
import React, { PropTypes } from 'react';

import { alertPropTypes } from '../shapes';

function Alert({ message, onClick, type }) {
  const className = cx('alert', type);

  return (
    <li className={className} onClick={onClick}>
      {message}
    </li>
  );
}

Alert.propTypes = {
  ...alertPropTypes,
  onClick: PropTypes.func.isRequired,
};

export default Alert;
