import { PropTypes } from 'react';

const alertPropTypes = {
  clientId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'notice']).isRequired,
};

const alertShape = PropTypes.shape(alertPropTypes);

export default alertShape;
export { alertPropTypes };
