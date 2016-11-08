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

/**
 * Checks a response's data for `meta.error` and returns a rejected promise if
 * found.
 */
function checkForMetaErr(response) {
  if (!has('meta.error')(response.data)) return null;

  const error = new Error(castArray(response.data.meta.error).join('; '));
  error.config = response.config;
  error.response = response;
  return Promise.reject(error);
}

// Check the response data for `meta.error` keys and reject when present.
//   `meta.error` keys take priority over status codes for displaying an error.
client.interceptors.response.use(
  response => checkForMetaErr(response) || response,
  error => checkForMetaErr(error.response) || Promise.reject(error),
);

export default client;
