import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import mockStore from './mockStore';

/**
 * Shared behaviors for asynchronous action creators.
 */
export function behavesLikeAsyncAction() {
  it('returns a thunk', function () {
    expect(this.subject).to.be.a('function');
  });

  it('makes the correct web request', function () {
    this.subject();
    expect(fetchMock.called(this.url)).to.be(true);
  });

  it('dispatches the correct action', function () {
    return mockStore.dispatch(this.subject).then(() => {
      expect(mockStore.getActions()[0]).to.eql(this.expectedAction);
    });
  });

  context('when receiving an error', function () {
    before(function mockApiResponse() {
      fetchMock.reMock(this.url, { error: 'AN ERROR' });
    });

    it('dispatches the error', function () {
      return mockStore.dispatch(this.subject).then(() => {
        expect(mockStore.getActions()[0]).to.eql({
          type: this.expectedAction.type,
          payload: new Error('AN ERROR'),
          error: true,
        });
      });
    });
  });
}
