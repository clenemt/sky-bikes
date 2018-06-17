const routes = {};
const route = (url, fn) => (routes[url] = fn);

const start = () => {
  const loc = window.location;
  if (routes['*']) routes['*'](loc.pathname);

  Object.keys(routes).forEach((url) => {
    if (!url.includes(loc.pathname)) return;
    routes[url](loc.pathname);
  });
};

const nav = (path) => {
  window.location.href = window.origin + path;
};

export { route, start, nav };
