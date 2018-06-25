import { Router, getQueryParams } from '../router';

let router;

beforeEach(() => {
  router = new Router();
});

describe('getQueryParams()', () => {
  it('should get the query parameters as key/value pairs', () => {
    expect(getQueryParams('?foo=1&bar=2')).toEqual({
      foo: '1',
      bar: '2',
    });
  });
});

describe('route()', () => {
  it('should save the route passed', () => {
    router.route('foo', 'baz');
    expect(router.routes.foo).toEqual(['baz']);
  });

  it('should save multiple handler for same route', () => {
    router.route('foo', 'baz', 'bar');
    expect(router.routes.foo).toEqual(['baz', 'bar']);
  });
});

describe('start()', () => {
  it('should call the route function for the current url', () => {
    const routeFunction = jest.fn();
    router.route('foo', routeFunction);
    router.start({ pathname: 'foo' });
    expect(routeFunction).toHaveBeenCalled();
  });

  it('should call the route function in order', () => {
    let response;
    const first = jest.fn(() => (response = 'first'));
    const second = jest.fn(() => (response = 'second'));
    router.route('foo', first, second);
    router.start({ pathname: 'foo' });
    expect(response).toBe('second');
  });

  it('should call the * route function for every routes', () => {
    const allRoutesFunction = jest.fn();
    router.route('*', allRoutesFunction);
    router.start({ pathname: 'foo' });
    router.start({ pathname: 'bar' });
    expect(allRoutesFunction).toHaveBeenCalledTimes(2);
  });
});
