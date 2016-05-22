import { PropTypes } from 'react';

const todoShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
});

export default todoShape;
