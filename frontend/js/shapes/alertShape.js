import { PropTypes } from 'react';

export const alertPropTypes = {
  clientId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'notice']).isRequired,
};

export default PropTypes.shape(alertPropTypes);
