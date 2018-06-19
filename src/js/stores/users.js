import store from '../utils/store';
import { generate } from '../models/user';
import { log } from './logs';

/**
 * Return all users or generate a certain amount
 * of users if it is the first call.
 * @return {Object[]} Returns the users.
 */
const getAll = () => {
  const users = store.get('users');
  return users || store.set('users', generate(10));
};

/**
 * Add a user to the store.
 * @param  {Object} user - The user to add.
 * @return {Object} Returns the new user.
 */
const add = (user) => store.set('users', [...getAll(), user]);

/**
 * Get a user by its email.
 * @param  {String} email
 * @return {Object} Returns the user if found, otherwise `undefined`.
 */
const get = (email) => getAll().find((user) => user.email === email);

/**
 * Ban a user by email.
 * @param  {String} email
 */
const ban = (email) => {
  const users = getAll();
  const user = users.find((usr) => usr.email === email);
  if (user.admin) return;
  user.banned = true;
  store.set('users', users);
  log(`*banned* ${email} due to late return`);
};

export { add, get, getAll, ban };
