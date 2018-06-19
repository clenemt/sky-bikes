import * as userStore from './stores/user';
import * as usersStore from './stores/users';
import { log } from './stores/logs';
import { nav } from './utils/router';

const userExist = (email) => {
  const users = usersStore.getAll();
  return users.find((user) => user.email === email);
};

const isLoggedIn = () => userStore.get();

const isBanned = () => {
  const user = userStore.get();
  return (usersStore.get(user) || {}).banned;
};

const isAdmin = () => {
  const user = userStore.get();
  return (usersStore.get(user) || {}).admin;
};

const signin = (email) => {
  if (!userExist(email)) return;
  log(`*signin* from ${email}`);
  return userStore.set(email);
};

const signout = (error) => {
  const user = userStore.get();
  if (user) {
    log(`*signout* from ${user}`);
    userStore.set('');
  }
  nav(`/index.html${error ? `?${error}` : ''}`);
};

const signup = ({ email, ...values }) => {
  if (userExist(email)) return 'userError';
  log(`*signup* from ${email}`);
  userStore.set(email);
  usersStore.set({ email, ...values });
};

export { isLoggedIn, isAdmin, isBanned, signup, signout, signin };
