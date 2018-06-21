import { authorize } from '../routes';
import * as passport from '../passport';

jest.mock('../passport');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('authorize()', () => {
  it('should return a function', () => {
    expect(typeof authorize()).toBe('function');
  });

  it('should return a function that return an authError when user is not logged in', () => {
    authorize()();
    expect(passport.signout).toHaveBeenCalledWith('authError');
  });

  it('should return a function that return a banError when user is banned', () => {
    passport.isLoggedIn.mockReturnValue(true);
    passport.isBanned.mockReturnValue(true);
    authorize()();
    expect(passport.signout).toHaveBeenCalledWith('banError');
  });

  it('should return a function that return true if user is logged in and not banned', () => {
    passport.isLoggedIn.mockReturnValue(true);
    expect(authorize()()).toBeTruthy();
  });

  it('should return a function that return an authError when requireAdmin is true', () => {
    passport.isLoggedIn.mockReturnValue(true);
    authorize(true)();
    expect(passport.signout).toHaveBeenCalledWith('authError');
  });
});
