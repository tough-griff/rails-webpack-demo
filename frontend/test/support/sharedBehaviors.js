import castArray from 'lodash/castArray';

import mockStore from './mockStore';

/**
 * Assert that a given action creator behaves correctly.
 */
export function behavesLikeActionCreator(subject, expectedActions, store = mockStore) {
  after(function clearStoreActions() {
    store.clearActions();
  });

  it('dispatches the correct action(s)', function () {
    store.dispatch(subject);
    expect(store.getActions()).to.eql(castArray(expectedActions));
  });
}

/**
 * Assert that an API client function makes the correct request and returns the
 * expected result.
 */
export function behavesLikeApiCall(subject, ...args) {
  return {
    returning(expectedValue) {
      it('returns the correct value', function () {
        return subject(...args).then((returnValue) => {
          expect(returnValue).to.eql(expectedValue);
        });
      });
    },
  };
}

/**
 * Assert that a reducer handles basic behaviors consistently.
 */
export function behavesLikeReducer(reducer, initialState) {
  it('exposes a function', function () {
    expect(reducer).to.be.a('function');
  });

  context('with no state argument', function () {
    const result = reducer(undefined, {});

    it('returns the initial state', function () {
      expect(result).to.eql(initialState);
    });
  });

  context('with no valid action type', function () {
    const result = reducer(initialState, { type: 'NONSENSE' });

    it('passes state through', function () {
      expect(result).to.equal(initialState);
    });
  });
}
