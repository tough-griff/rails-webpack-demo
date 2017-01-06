let metaTags;

/**
 * Retrieve the meta `content` from a meta tag given the tag `name`.
 * @param  {String} name meta tag name
 * @return {String}      meta tag content
 */
export default function meta(name) {
  metaTags = metaTags || document.getElementsByTagName('meta');
  return metaTags[name] ? metaTags[name].content : undefined;
}
