/* eslint no-param-reassign: off, prefer-destructuring: off */
const routes = {};

/**
 * Save the url and the functions passed inside our routes object.
 * @param  {String} url
 * @param  {...[Function]} fns
 */
const route = (url, ...fns) => (routes[url] = fns);

/**
 * Retrieve the query parameters from the passed string.
 * @param  {String} string
 * @return {Object} Returns an object where keys are the params name and values are the values.
 */
const getQueryParams = (string) =>
  string
    .substr(1)
    .split('&')
    .reduce((result, keyValue) => {
      const param = keyValue.split('=');
      result[param[0]] = param[1] != null ? param[1] : true;
      return result;
    }, {});

/**
 * Iterate over each routes previously saved
 * and call their functions one after the other
 * if they match the current url.
 */
const start = () => {
  const loc = window.location;
  const path = loc.pathname.replace(__BASE_URL__, '');
  const params = getQueryParams(loc.search);

  if (routes['*']) routes['*'].forEach((fn) => fn(params));

  Object.keys(routes).forEach((url) => {
    const isRoot = url === '/index.html' && path === '/';
    if (url !== path && !isRoot) return;
    routes[url].every((fn) => fn(params));
  });
};

/**
 * A simple navigation helper.
 * @param  {String} path - The path to navigate to.
 */
const nav = (path) => {
  window.location.href = window.origin + __BASE_URL__ + path;
};

export { route, start, nav };
