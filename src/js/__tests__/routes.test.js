import { authorize } from '../routes';
import * as passport from '../passport';

jest.mock('../passport');

describe('authorize()', () => {
  it('should return a function', () => {
    expect(typeof authorize()).toBe('function');
  });

  it('should return a function that return an authError when user is not logged in', () => {
    authorize()();
    expect(passport.signout).toHaveBeenCalledWith('authError');
  });

  it('should return a function that return an banError when user is banned', () => {
    passport.isLoggedIn.mockReturnValue(true);
    passport.isBanned.mockReturnValue(true);
    authorize()();
    expect(passport.signout).toHaveBeenCalledWith('banError');
  });
});
