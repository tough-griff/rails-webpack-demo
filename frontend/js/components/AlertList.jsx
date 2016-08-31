import { map } from 'lodash/fp';
import React, { PropTypes } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import Alert from '../containers/redux/Alert';
import { alertShape } from '../shapes';

function AlertList({ alerts }) {
  const alertItems = map(alert =>
    <Alert key={`alert-${alert.clientId}`} {...alert} />
  )(alerts);

  return (
    <CSSTransitionGroup
      className="alert-list"
      component="ul"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={250}
      transitionName="fade"
    >
      {alertItems}
    </CSSTransitionGroup>
  );
}

AlertList.propTypes = {
  alerts: PropTypes.arrayOf(alertShape).isRequired,
};

export default AlertList;
