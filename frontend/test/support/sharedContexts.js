import moxios from 'moxios';

/**
 * Sets up (and tears down) a mocked axios client, resetting stubs and calls
 * between blocks.
 */
export function withMoxios(client) {
  beforeEach(function install() {
    moxios.install(client);
  });

  afterEach(function reset() {
    moxios.uninstall(client);
  });
}

/**
 * Mocks a url request with a given url as a regular expression.
 */
export function withMockedUrl(url, opts) {
  before(function stubApi() {
    moxios.stubRequest(new RegExp(url), opts);
  });
}
