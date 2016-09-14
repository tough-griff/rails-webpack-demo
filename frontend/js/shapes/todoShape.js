import { PropTypes } from 'react';

const todoPropTypes = {
  createdAt: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

const todoShape = PropTypes.shape(todoPropTypes);

export default todoShape;
export { todoPropTypes };
