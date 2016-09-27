import { each } from 'lodash';
import { List } from 'immutable';

import { behavesLikeReducer } from '../support/sharedBehaviors';
import application, { Application, createAlert } from '../../js/reducers/application';

describe('application()', function () {
  let state = new Application();

  behavesLikeReducer(application, state);

  context('with action type "ADD_TODO"', function () {
    const action = { type: 'ADD_TODO' };

    it('toggles loading: true', function () {
      const result = application(state, action).get('isLoading');
      expect(result).to.be.true();
    });
  });

  context('with action type "ADD_TODO__END"', function () {
    const action = { type: 'ADD_TODO__END' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action).get('isLoading');
      expect(result).to.be.false();
    });
  });

  context('with action type "ADD_TODO__ERR"', function () {
    const action = { type: 'ADD_TODO__ERR', payload: 'Error' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result.get('isLoading')).to.be.false();
      expect(result.get('alerts')).to.have.property('size', 1);
    });
  });

  context('with action type "FETCH_ALL_TODOS"', function () {
    const action = { type: 'FETCH_ALL_TODOS' };

    it('toggles loading: true', function () {
      const result = application(state, action).get('isLoading');
      expect(result).to.be.true();
    });
  });

  context('with action type "FETCH_ALL_TODOS__END"', function () {
    const action = { type: 'FETCH_ALL_TODOS__END' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action).get('isLoading');
      expect(result).to.be.false();
    });
  });

  context('with action type "FETCH_ALL_TODOS__ERR"', function () {
    const action = { type: 'FETCH_ALL_TODOS__ERR', payload: 'Error' };

    before(function setState() {
      state = state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result.get('isLoading')).to.be.false();
      expect(result.get('alerts')).to.have.property('size', 1);
    });
  });

  describe('error handling', function () {
    const actionTypes = [
      'CLEAR_COMPLETE_TODOS__ERR',
      'DELETE_TODO__ERR',
      'EDIT_TODO__ERR',
      'FETCH_TODO__ERR',
      'MARK_ALL_TODOS__ERR',
      'MARK_TODO__ERR',
      'MOVE_TODO__ERR',
    ];

    each(actionTypes, (type) => {
      context(`with action type "${type}"`, function () {
        const action = { type, payload: 'Error' };

        it('appends an error', function () {
          const result = application(state, action).get('alerts');
          expect(result).to.have.property('size', 1);
        });
      });
    });
  });

  // Alert handlers
  context('when action type "ADD_ALERT"', function () {
    const action = {
      type: 'ADD_ALERT',
      payload: { message: 'info', type: 'info' },
    };

    it('appends an alert', function () {
      const result = application(state, action).get('alerts');
      expect(result).to.have.property('size', 1);
      expect(result.first()).to.have.property('message', 'info');
      expect(result.first()).to.have.property('type', 'info');
    });
  });

  context('when action type "CLEAR_ALERT"', function () {
    const clientId = 12345;
    const action = { type: 'CLEAR_ALERT', payload: { clientId } };

    before(function setState() {
      state = state.set('alerts', new List([
        createAlert(),
        createAlert({ clientId }),
      ]));
    });

    it('removes the correct alert', function () {
      const result = application(state, action).get('alerts');
      expect(result).to.have.property('size', 1);
      expect(result.every(alert => alert.get('clientId') !== clientId))
        .to.be.true();
    });
  });
});
