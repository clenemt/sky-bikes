import store from './utils/store';

const isAuthorized = () => store.get('user');
const isAdmin = () => (store.get('user') || {}).admin;
const login = (email) => store.set('email', { email });

export { isAuthorized, isAdmin, login };
