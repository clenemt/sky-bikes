import store from '../utils/store';

const get = () => store.get('user');
const set = (user) => store.set('user', user);

export { get, set };
