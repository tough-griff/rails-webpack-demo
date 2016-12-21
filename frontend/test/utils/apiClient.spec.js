import moxios from 'moxios';

import { withMoxios } from '../support/sharedContexts';
import apiClient from '../../js/utils/apiClient';

describe('apiClient', function () {
  withMoxios(apiClient);

  context('making a successful request', function () {
    const url = '/url';
    const data = { hello: 'world' };

    before(function stubAxios() {
      moxios.stubRequest(url, { response: data, status: 200 });
    });

    it('fetches the correct data', function () {
      return apiClient.get(url).then((response) => {
        expect(response.data).to.eql(data);
      });
    });

    context('with a `meta.error` value', function () {
      const errorUrl = '/error-url';
      const errMsg = 'we have a problem';
      const errorData = { meta: { error: errMsg } };

      before(function stubAxios() {
        moxios.stubRequest(errorUrl, { response: errorData, status: 200 });
      });

      it('throws the correct error', function () {
        return apiClient.get(errorUrl).catch((error) => {
          expect(error.message).to.include(errMsg);
        });
      });
    });
  });

  context('making a failed request', function () {
    const url = '/failed-url';
    const status = 404;

    before(function stubAxios() {
      moxios.stubRequest(url, { status });
    });

    it('throws the correct error', function () {
      return apiClient.get(url).catch((error) => {
        expect(error.message).to.include(status);
      });
    });

    context('with a `meta.error` value', function () {
      const errorUrl = '/another-error-url';
      const errMsg = 'we have a problem';
      const errorData = { meta: { error: errMsg } };

      before(function stubAxios() {
        moxios.stubRequest(errorUrl, { response: errorData, status: 500 });
      });

      it('throws the correct error', function () {
        return apiClient.get(errorUrl).catch((error) => {
          expect(error.message).to.include(errMsg);
        });
      });
    });

    context('without a valid response object', function () {
      const errorUrl = '/blank-response-url';

      before(function stubAxios() {
        moxios.stubRequest(errorUrl);
      });

      it('throws the correct error', function () {
        return apiClient.get(errorUrl).catch((error) => {
          expect(error.message).to.include('undefined');
        });
      });
    });
  });
});
