import * as Actions from './constants';

export function addAlert({ message, type }) {
  return {
    type: Actions.ADD_ALERT,
    payload: { message, type },
  };
}

export function clearAlert(clientId) {
  return {
    type: Actions.CLEAR_ALERT,
    payload: { clientId },
  };
}

export function clearAllAlerts() {
  return {
    type: Actions.CLEAR_ALL_ALERTS,
  };
}
