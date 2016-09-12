import { PropTypes } from 'react';

const alertShape = PropTypes.shape({
  clientId: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'notice']).isRequired,
});

export default alertShape;
