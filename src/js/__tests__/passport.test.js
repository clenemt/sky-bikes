import * as passport from '../passport';
import { nav } from '../utils/router';
import * as userStore from '../stores/user';
import * as usersStore from '../stores/users';

jest.mock('../stores/user');
jest.mock('../stores/logs');
jest.mock('../stores/users');
jest.mock('../utils/router');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('isLoggedIn()', () => {
  it('should return a boolean', () => {
    expect(typeof passport.isLoggedIn()).toBe('boolean');
  });
});

describe('isBanned()', () => {
  it('should return a boolean', () => {
    expect(typeof passport.isBanned()).toBe('boolean');
  });
});

describe('isAdmin()', () => {
  it('should return a boolean', () => {
    expect(typeof passport.isAdmin()).toBe('boolean');
  });
});

describe('signin()', () => {
  it('should signin the user', () => {
    usersStore.getAll.mockReturnValue([{ email: 'foo' }]);
    passport.signin('foo');
    expect(userStore.set).toHaveBeenCalledWith('foo');
  });

  it('should return a boolean', () => {
    usersStore.getAll.mockReturnValue([{}]);
    expect(typeof passport.signin()).toBe('boolean');
  });
});

describe('signout()', () => {
  it('should signout the user', () => {
    userStore.get.mockReturnValue(true);
    passport.signout();
    expect(userStore.set).toHaveBeenCalledWith('');
  });

  it('should navigate to home page with the error provided', () => {
    passport.signout('foo');
    expect(nav).toHaveBeenCalledWith('/index.html?foo');
  });
});

describe('signup()', () => {
  it('should signup the new user', () => {
    usersStore.getAll.mockReturnValue([{}]);
    passport.signup({ email: 'foo', bar: 'bar' });
    expect(userStore.set).toHaveBeenCalledWith('foo');
    expect(usersStore.add).toHaveBeenCalledWith({ email: 'foo', bar: 'bar' });
  });

  it('should return a userError if user exist', () => {
    usersStore.getAll.mockReturnValue([{ email: 'foo' }]);
    passport.signup({ email: 'foo', bar: 'bar' });
    expect(passport.signup({ email: 'foo' })).toBe('userError');
  });
});
