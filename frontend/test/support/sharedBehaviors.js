import fetchMock from 'fetch-mock';
import castArray from 'lodash/castArray';
import each from 'lodash/each';

import mockStore from './mockStore';

/**
 * Assert that a given action creator behaves correctly.
 */
export function behavesLikeActionCreator(subject, expectedActions) {
  it('dispatches the correct action(s)', function () {
    mockStore.dispatch(subject);
    expect(mockStore.getActions()).to.eql(castArray(expectedActions));
  });
}

/**
 * Assert that an API client function makes the correct request and returns the
 * expected result.
 */
export function behavesLikeApiClient(subject, args, urls, expectedValue) {
  let result;

  before(function evaluateSubject() {
    result = subject(...args);
  });

  it('makes the correct web request(s)', function () {
    each(castArray(urls), url => {
      expect(fetchMock.called(url)).to.be.true();
    });
  });

  it('returns the correct value', function () {
    return result.then(returnValue => {
      expect(returnValue).to.eql(expectedValue);
    });
  });
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
