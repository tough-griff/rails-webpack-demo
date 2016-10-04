import { castArray, has, merge } from 'lodash/fp';

/**
 * Extracts the CSRF token from the page's meta tags.
 */
function getCSRFToken() {
  return document.getElementsByTagName('meta')['csrf-token'].content;
}

/**
 * Parse the response's JSON. If we didn't receive a JSON response from the
 * server, we throw an error.
 */
function parseJSON(response) {
  if (!response.headers.get('Content-Type').includes('application/json')) {
    throw new Error('Received an unexpected response from the server');
  }

  return response.json();
}

/**
 * Check the JSON response and throw if the response includes a `meta.error`
 * key.
 */
function checkJSON(json) {
  if (has('meta.error')(json)) {
    throw new Error(castArray(json.meta.error).join('; '));
  }

  return json;
}

/**
 * Allow actions to use a default `fetch` configuration.
 */
export default function fetch(url, config) {
  const fetchConfig = merge({
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': getCSRFToken(),
    },
  })(config);

  return global.fetch(url, fetchConfig)
    .then(parseJSON)
    .then(checkJSON);
}
