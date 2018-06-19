import store from '../utils/store';

/**
 * Get the current user email.
 * @return {String} Returns the current user email.
 */
const get = () => store.get('user');

/**
 * Set the current user email.
 * @param  {String} email
 * @return {String} Returns the current user email.
 */
const set = (email) => store.set('user', email);

export { get, set };
