import axios from 'axios';
import { castArray, has } from 'lodash/fp';

function getCSRFToken() {
  return document.getElementsByTagName('meta')['csrf-token'].content;
}

const client = axios.create({
  timeout: 2000,
  headers: {
    'X-CSRF-Token': getCSRFToken(),
  },
});

const hasMetaError = has('meta.error');

/**
 * Checks a response's data for `meta.error` and returns a rejected promise if
 * found. The second argument is a function which returns the early exit value.
 * This allows promises to reject lazily, so you do not get uncaught initialized
 * rejections.
 */
function checkResponse(response, returnFunc = () => response) {
  const { config, data } = response;
  if (!hasMetaError(data)) return returnFunc();

  const error = new Error(castArray(data.meta.error).join('; '));
  error.config = config;
  error.response = response;
  return Promise.reject(error);
}

// Check the response data for `meta.error` keys and reject when present.
// `meta.error` keys take priority over status codes for displaying an error.
client.interceptors.response.use(
  // Response interceptor
  checkResponse,

  // Error interceptor
  (error) => {
    const reject = () => Promise.reject(error);
    return error.response ? checkResponse(error.response, reject) : reject();
  },
);

export default client;
