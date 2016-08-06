import { behavesLikeReducer } from '../support/sharedBehaviors';
import application, { Application } from '../../js/reducers/application';

describe('application()', function () {
  const state = new Application();

  behavesLikeReducer(application, state);

  context('with action type "ADD_TODO"', function () {
    const action = { type: 'ADD_TODO' };

    it('toggles loading: true', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.true();
    });
  });

  context('with action type "ADD_TODO__END"', function () {
    const action = { type: 'ADD_TODO__END' };

    before(function setState() {
      state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.false();
    });
  });

  context('with action type "ADD_TODO__ERR"', function () {
    const action = { type: 'ADD_TODO__ERR', payload: 'Error' };

    before(function setState() {
      state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.false();
      expect(result.errors).to.have.property('size', 1);
    });
  });

  context('with action type "FETCH_ALL_TODOS"', function () {
    const action = { type: 'FETCH_ALL_TODOS' };

    it('toggles loading: true', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.true();
    });
  });

  context('with action type "FETCH_ALL_TODOS__END"', function () {
    const action = { type: 'FETCH_ALL_TODOS__END' };

    before(function setState() {
      state.set('isLoading', true);
    });

    it('toggles loading: false', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.false();
    });
  });

  context('with action type "FETCH_ALL_TODOS__ERR"', function () {
    const action = { type: 'FETCH_ALL_TODOS__ERR', payload: 'Error' };

    before(function setState() {
      state.set('isLoading', true);
    });

    it('toggles loading: false, appends an error', function () {
      const result = application(state, action);
      expect(result.isLoading).to.be.false();
      expect(result.errors).to.have.property('size', 1);
    });
  });
});
