/* eslint no-param-reassign: off, prefer-destructuring: off */
const routes = {};
const route = (url, ...fns) => (routes[url] = fns);

const getQueryParams = (search) =>
  search
    .substr(1)
    .split('&')
    .reduce((result, keyValue) => {
      const param = keyValue.split('=');
      result[param[0]] = param[1] != null ? param[1] : true;
      return result;
    }, {});

const start = () => {
  const loc = window.location;
  const params = getQueryParams(loc.search);

  if (routes['*']) routes['*'].forEach((fn) => fn(params));

  Object.keys(routes).forEach((url) => {
    const isRoot = url === '/index.html' && loc.pathname === '/';
    if (url !== loc.pathname && !isRoot) return;
    routes[url].every((fn) => fn(params));
  });
};

const nav = (path) => {
  window.location.href = window.origin + path;
};

export { route, start, nav };
