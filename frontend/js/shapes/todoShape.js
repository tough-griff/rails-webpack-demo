import { PropTypes } from 'react';

const todoShape = PropTypes.shape({
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});

export default todoShape;
