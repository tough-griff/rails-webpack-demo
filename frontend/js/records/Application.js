import { List, Record } from 'immutable';

const Application = new Record({
  alerts: new List(),
  isLoading: false,
}, 'Application');

export default Application;
