import moxios from 'moxios';

/**
 * Sets up (and tears down) a mocked axios client, resetting stubs and calls
 * between blocks.
 */
/* eslint-disable import/prefer-default-export */
export function withMoxios(client) {
  beforeEach(function install() {
    moxios.install(client);
  });

  afterEach(function reset() {
    moxios.uninstall(client);
  });
}
