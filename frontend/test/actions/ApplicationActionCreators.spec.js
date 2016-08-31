import mockStore from '../support/mockStore';
import { behavesLikeActionCreator } from '../support/sharedBehaviors';
import * as ApplicationActionCreators from '../../js/actions/ApplicationActionCreators';

describe('ApplicationActionCreators', function () {
  afterEach(function resetMocks() {
    mockStore.clearActions();
  });

  describe('clearAlert()', function () {
    const clientId = 4;
    const subject = ApplicationActionCreators.clearAlert(clientId);
    const expectedAction = {
      type: 'CLEAR_ALERT',
      payload: { clientId },
    };

    behavesLikeActionCreator(subject, expectedAction);
  });
});
