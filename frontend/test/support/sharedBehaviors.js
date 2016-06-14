import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import mockStore from './mockStore';

/**
 * Shared behaviors for asynchronous action creators.
 */
export function behavesLikeAsyncAction(subject, url, expectedAction) {
  it('returns a thunk', function () {
    expect(subject).to.be.a('function');
  });

  it('makes the correct web request', function () {
    mockStore.dispatch(subject);
    expect(fetchMock.called(url)).to.be(true);
  });

  it('dispatches the correct action', function () {
    return mockStore.dispatch(subject).then(() => {
      expect(mockStore.getActions()[0]).to.eql(expectedAction);
    });
  });

  context('when receiving an error', function () {
    const error = 'AN ERROR';

    before(function mockApiResponse() {
      fetchMock.reMock(url, { error });
    });

    it('dispatches the error', function () {
      return mockStore.dispatch(subject).then(() => {
        expect(mockStore.getActions()[0]).to.eql({
          type: expectedAction.type,
          payload: new Error(error),
          error: true,
        });
      });
    });
  });
}
