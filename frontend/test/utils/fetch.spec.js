import fetchMock from 'fetch-mock';

import fetch from '../../js/utils/fetch';

describe('fetch()', function () {
  const url = 'some-url.com';

  before(function stubGetElementsByTagName() {
    sinon.stub(document, 'getElementsByTagName').returns({
      'csrf-token': { content: 'FAKE_CSRF_TOKEN' },
    });
  });

  beforeEach(function stubFetch() {
    fetchMock.get(url, {
      body: { hello: 'world' },
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  });

  afterEach(function restoreFetch() {
    fetchMock.restore();
  });

  after(function restoreGetElementsByTagName() {
    document.getElementsByTagName.restore();
  });


  it('does not override global fetch', function () {
    expect(fetch).not.to.equal(global.fetch);
  });

  it('delegates web requests to global fetch', function () {
    fetch(url, { method: 'GET' });

    expect(fetchMock.called(url)).to.be.true();
  });

  it('extracts CSRF tokens from the DOM', function () {
    fetch(url, { method: 'GET' });

    expect(document.getElementsByTagName)
      .to.have.been.calledWithExactly('meta');
  });

  it('parses JSON correctly', function () {
    return fetch(url, { method: 'GET' })
      .then((json) => {
        expect(json).to.have.property('hello', 'world');
      });
  });

  context('when receiving a non-JSON response', function () {
    const textUrl = 'some-plain-text.com';

    before(function stubFetchPlainText() {
      fetchMock.get(textUrl, {
        body: 'plain text goes here',
        headers: { 'Content-Type': 'text/plain' },
        status: 200,
      });
    });

    it('parses JSON correctly', function () {
      return fetch(textUrl, { method: 'GET' })
        .catch((err) => {
          expect(err).to.match(/unexpected response/);
        });
    });
  });

  context('when JSON response includes an error key', function () {
    const errorUrl = 'error-key.com';

    before(function stubFetchErrorKey() {
      fetchMock.get(errorUrl, {
        body: {
          hello: 'world',
          meta: {
            error: ['something went wrong'],
          },
        },
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    });

    it('parses JSON correctly', function () {
      return fetch(errorUrl, { method: 'GET' })
        .then((json) => {
          expect(json).not.to.have.property('hello', 'world');
        })
        .catch((err) => {
          expect(err).to.match(/something went wrong/);
        });
    });
  });
});
