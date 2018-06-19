import store from '../utils/store';
import { generate } from '../models/user';
import { log } from './logs';

const getAll = () => {
  const users = store.get('users');
  return users || store.set('users', generate(10));
};

const set = (user) => store.set('users', [...getAll(), user]);
const get = (email) => getAll().find((user) => user.email === email);

const ban = (email) => {
  const users = getAll();
  const user = users.find((usr) => usr.email === email);
  if (user.admin) return;
  user.banned = true;
  store.set('users', users);
  log(`*banned* ${email} due to late return`);
};

export { set, get, getAll, ban };
