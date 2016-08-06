import { PropTypes } from 'react';

const storeShape = PropTypes.shape({
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  replaceReducer: PropTypes.func.isRequired,
  runSaga: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
});

export default storeShape;
