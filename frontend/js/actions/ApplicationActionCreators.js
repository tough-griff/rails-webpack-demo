/* eslint-disable import/prefer-default-export */
export function clearAlert(clientId) {
  return {
    type: 'CLEAR_ALERT',
    payload: { clientId },
  };
}
