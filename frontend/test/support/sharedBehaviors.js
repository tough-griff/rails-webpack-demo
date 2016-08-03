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
 * Assert that a given asynchronous (i.e. fetch) action creator behaves correctly.
 */
export function behavesLikeAsyncActionCreator(subject, urls, expectedActions) {
  it('returns a thunk', function () {
    expect(subject).to.be.a('function');
  });

  it('makes the correct web request(s)', function () {
    mockStore.dispatch(subject);

    each(castArray(urls), url => {
      expect(fetchMock.called(url)).to.be.true();
    });
  });

  it('dispatches the correct action(s)', function () {
    return mockStore.dispatch(subject).then(() => {
      expect(mockStore.getActions()).to.eql(castArray(expectedActions));
    });
  });

  return {
    /**
     * Assert that the action handler being tested handles error responses
     * correctly.
     */
    withErrorHandlingFor(url, actionType) {
      context('when receiving an error response', function () {
        const error = 'AN ERROR';

        before(function mockApiResponse() {
          fetchMock.restore().mock(url, {
            status: 500,
            body: { error },
          });
        });

        it('dispatches the error', function () {
          return mockStore.dispatch(subject).then(() => {
            const actions = mockStore.getActions();

            expect(actions).to.include.something.that.eqls({
              type: actionType,
              payload: new Error('AN ERROR'),
              error: true,
            });
          });
        });
      });

      return this;
    },
  };
}
