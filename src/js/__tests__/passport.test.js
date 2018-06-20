import { isLoggedIn, isBanned, isAdmin, signout } from '../passport';
import * as userStore from '../stores/user';

jest.mock('../stores/user');
jest.mock('../stores/logs');
jest.mock('../stores/users');
jest.mock('../utils/router');

describe('isLoggedIn()', () => {
  it('should return a boolean', () => {
    expect(typeof isLoggedIn()).toBe('boolean');
  });
});

describe('isBanned()', () => {
  it('should return a boolean', () => {
    expect(typeof isBanned()).toBe('boolean');
  });
});

describe('isAdmin()', () => {
  it('should return a boolean', () => {
    expect(typeof isAdmin()).toBe('boolean');
  });
});

describe('signout()', () => {
  it('should signout the user', () => {
    userStore.get.mockReturnValue(true);
    signout();
    expect(userStore.set).toHaveBeenCalledTimes(1);
  });
});
