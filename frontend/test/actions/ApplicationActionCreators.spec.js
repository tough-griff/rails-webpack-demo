import { behavesLikeActionCreator } from '../support/sharedBehaviors';
import * as Actions from '../../js/actions/constants';
import * as ApplicationActionCreators from '../../js/actions/ApplicationActionCreators';

describe('ApplicationActionCreators', function () {
  describe('clearAlert()', function () {
    const message = 'Alert message';
    const type = 'info';
    const subject = ApplicationActionCreators.addAlert({ message, type });
    const expectedAction = {
      type: Actions.ADD_ALERT,
      payload: { message, type },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('clearAlert()', function () {
    const clientId = '456def';
    const subject = ApplicationActionCreators.clearAlert(clientId);
    const expectedAction = {
      type: Actions.CLEAR_ALERT,
      payload: { clientId },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });

  describe('clearAllAlerts()', function () {
    const subject = ApplicationActionCreators.clearAllAlerts();
    const expectedAction = {
      type: Actions.CLEAR_ALL_ALERTS,
    };

    behavesLikeActionCreator(subject, expectedAction);
  });
});
