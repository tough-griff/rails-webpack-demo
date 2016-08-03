import fetchMock from 'fetch-mock';

fetchMock.patch = function patch(matcher, response, options) {
  return this.mock(matcher, response, Object.assign({}, options, { method: 'PATCH' }));
};
