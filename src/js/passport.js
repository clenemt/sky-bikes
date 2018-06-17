import store from './utils/store';

const isAuthorized = (email) => {
  const users = store.get('users') || [];
  return users.find((user) => user.email === email);
};

const isUserLoggedIn = () => store.get('user');
const isUserAdmin = () => (store.get('user') || {}).admin;

const signin = (email) => isAuthorized(email) && store.set('user', email);
const signout = () => store.set('user', '');
const signup = ({ email, ...values }) => {
  if (isAuthorized(email)) return 'userError';

  const users = store.get('users') || [];
  users.push({ email, ...values });

  store.set('users', users);
  store.set('user', email);
};

export { isUserLoggedIn, isUserAdmin, isAuthorized, signup, signout, signin };
