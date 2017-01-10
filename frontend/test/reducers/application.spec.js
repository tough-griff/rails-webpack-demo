import { each } from 'lodash';
import { List } from 'immutable';

import { behavesLikeReducer } from '../support/sharedBehaviors';
import * as Actions from '../../js/actions/constants';
import Application from '../../js/records/Application';
import application, { createAlert } from '../../js/reducers/application';

describe('application()', function () {
  let state = new Application();

  behavesLikeReducer(application, state);

  context('with action type Actions.ADD_TODO', function () {
    const action = { type: Actions.ADD_TODO };

    it('toggles loading: true', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading');
    });
  });

  context('with action type Actions.ADD_TODO__END', function () {
    const action = { type: Actions.ADD_TODO__END };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading', false);
    });
  });

  context('with action type Actions.ADD_TODO__ERR', function () {
    const action = { type: Actions.ADD_TODO__ERR, payload: 'Error' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading', false);
      expect(result.get('alerts')).to.have.size(1);
    });
  });

  context('with action type Actions.FETCH_ALL_TODOS', function () {
    const action = { type: Actions.FETCH_ALL_TODOS };

    it('toggles loading: true', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading', true);
    });
  });

  context('with action type Actions.FETCH_ALL_TODOS__END', function () {
    const action = { type: Actions.FETCH_ALL_TODOS__END };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading', false);
    });
  });

  context('with action type Actions.FETCH_ALL_TODOS__ERR', function () {
    const action = { type: Actions.FETCH_ALL_TODOS__ERR, payload: 'Error' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result).to.have.property('isLoading', false);
      expect(result.get('alerts')).to.have.size(1);
    });
  });

  describe('error handling', function () {
    const actionTypes = [
      Actions.CLEAR_COMPLETE_TODOS__ERR,
      Actions.DELETE_TODO__ERR,
      Actions.EDIT_TODO__ERR,
      Actions.FETCH_TODO__ERR,
      Actions.MARK_ALL_TODOS__ERR,
      Actions.MARK_TODO__ERR,
      Actions.MOVE_TODO__ERR,
    ];

    each(actionTypes, (type) => {
      context(`with action type "${type}"`, function () {
        const action = { type, payload: 'Error' };

        it('appends an error', function () {
          const result = application(state, action).get('alerts');
          expect(result).to.have.size(1);
        });
      });
    });
  });

  // Alert handlers
  context('when action type Actions.ADD_ALERT', function () {
    const action = {
      type: Actions.ADD_ALERT,
      payload: { message: 'info', type: 'info' },
    };

    it('appends an alert', function () {
      const result = application(state, action).get('alerts');
      expect(result).to.have.size(1);
      expect(result.first()).to.have.property('message', 'info');
      expect(result.first()).to.have.property('type', 'info');
    });
  });

  context('when action type Actions.CLEAR_ALERT', function () {
    const clientId = '123abc';
    const action = { type: Actions.CLEAR_ALERT, payload: { clientId } };

    before(function setState() {
      state = state.set('alerts', new List([
        createAlert(),
        createAlert({ clientId }),
      ]));
    });

    it('removes the correct alert', function () {
      const result = application(state, action).get('alerts');
      expect(result).to.have.size(1);
      expect(result.every(alert => alert.get('clientId') !== clientId))
        .to.be.true();
    });
  });

  context('when action type Actions.CLEAR_ALL_ALERTS', function () {
    const action = { type: Actions.CLEAR_ALL_ALERTS };

    before(function setState() {
      state = state.set('alerts', new List([1, 2]));
    });

    it('removes the correct alert', function () {
      const result = application(state, action).get('alerts');
      expect(result).to.have.size(0);
    });
  });
});
