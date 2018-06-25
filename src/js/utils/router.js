/* eslint no-param-reassign: off, prefer-destructuring: off */

/**
 * Retrieve the query parameters from the passed string.
 * @param  {String} string
 * @return {Object} Returns an object where keys are the params name and values are the values.
 */
const getQueryParams = (string = '') =>
  string
    .substr(1)
    .split('&')
    .reduce((result, keyValue) => {
      const param = keyValue.split('=');
      result[param[0]] = param[1] != null ? param[1] : true;
      return result;
    }, {});

/**
 * A simple navigation helper.
 * @param  {String} path - The path to navigate to.
 */
const nav = (path) =>
  (window.location.href = window.origin + __BASE_URL__ + path);

class Router {
  constructor() {
    this.routes = {};
  }

  /**
   * Save the url and the functions passed inside our routes object.
   * @param  {String} url
   * @param  {...[Function]} fns
   */
  route(url, ...fns) {
    return (this.routes[url] = fns);
  }

  /**
   * Iterate over each routes previously saved
   * and call their functions one after the other
   * if they match the current url.
   */
  start(location = window.location) {
    const path = location.pathname.replace(__BASE_URL__, '');
    const params = getQueryParams(location.search);

    if (this.routes['*']) this.routes['*'].forEach((fn) => fn(params));

    Object.keys(this.routes).forEach((url) => {
      const isRoot = url === '/index.html' && path === '/';
      if (url !== path && !isRoot) return;
      this.routes[url].every((fn) => fn(params));
    });
  }
}

export { Router, getQueryParams, nav };
export default new Router();
