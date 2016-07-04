import fetchMock from 'fetch-mock';
import castArray from 'lodash/castArray';
import each from 'lodash/each';
import some from 'lodash/some';

import mockStore from './mockStore';

/**
 * Assert that a given action creator behaves correctly.
 */
export function behavesLikeAsyncActionCreator(subject, urls, expectedActions) {
  it('returns a thunk', function () {
    expect(subject).to.be.a('function');
  });

  it('makes the correct web request(s)', function () {
    mockStore.dispatch(subject);

    each(castArray(urls), url => {
      expect(fetchMock.called(url)).to.be(true);
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
          fetchMock.reMock(url, { error });
        });

        it('dispatches the error', function () {
          return mockStore.dispatch(subject).then(() => {
            const actions = mockStore.getActions();

            expect(some(actions, {
              type: actionType,
              payload: new Error('AN ERROR'),
              error: true,
            })).to.be(true);
          });
        });
      });

      return this;
    },
  };
}
