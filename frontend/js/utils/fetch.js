import { merge } from 'lodash/fp';

/**
 * Extracts the CSRF token from the page's meta tags.
 */
function getCSRFToken() {
  return document.getElementsByTagName('meta')['csrf-token'].content;
}

/**
 * Parse the response's JSON.
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Check the JSON response and throw if the response includes a top level
 * `error` key.
 */
function checkJSON(json) {
  if (json.error) throw new Error(json.error);

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
