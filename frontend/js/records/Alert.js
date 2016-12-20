import { Record } from 'immutable';

const Alert = new Record({
  clientId: 0,
  message: 'An error occurred',
  type: 'error',
}, 'Alert');

export default Alert;
