import * as userStore from './stores/user';
import * as usersStore from './stores/users';
import { log } from './stores/logs';
import { nav } from './utils/router';

// Small helper to check if user exist
const userExist = (email) => {
  const users = usersStore.getAll();
  return users.find((user) => user.email === email);
};

/**
 * Returns `true` if there is a user logged in.
 * @return {Boolean}
 */
const isLoggedIn = () => !!userStore.get();

/**
 * Returns `true` if the user is banned.
 * @return {Boolean}
 */
const isBanned = () => {
  const user = userStore.get();
  return !!(usersStore.get(user) || {}).banned;
};

/**
 * Returns `true` if the user is an admin.
 * @return {Boolean}
 */
const isAdmin = () => {
  const user = userStore.get();
  return !!(usersStore.get(user) || {}).admin;
};

/**
 * Sign in the current user only if he exists.
 * @param  {String} email - The user email.
 * @return {Boolean} Returns `true` if it succeeded.
 */
const signin = (email) => {
  if (!userExist(email)) return;
  log(`*signin* from ${email}`);
  return !!userStore.set(email);
};

/**
 * Signout the current user.
 * @param  {String} [error] - An optional error to show on login page.
 */
const signout = (error) => {
  const user = userStore.get();
  if (user) {
    log(`*signout* from ${user}`);
    userStore.set('');
  }
  nav(`/index.html${error ? `?${error}` : ''}`);
};

/**
 * Sign up a new user if it does not exist.
 * @param  {String} options.email
 */
const signup = ({ email, ...values }) => {
  if (userExist(email)) return 'userError';
  log(`*signup* from ${email}`);
  userStore.set(email);
  usersStore.add({ email, ...values });
};

export { isLoggedIn, isAdmin, isBanned, signup, signout, signin, userExist };
