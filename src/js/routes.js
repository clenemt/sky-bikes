import { isAuthorized } from './passport';
import * as router from './utils/router';
import * as login from './login';

const authorize = (path) => {
  if (path === '/index.html') return;
  if (!isAuthorized()) router.nav('/index.html?authError');
};

const init = () => {
  router.route('/index.html', login.init);
  router.route('/register.html', () => console.log('register'));
  router.route('/bike.html', () => console.log('bike'));
  router.route('/bikes.html', () => console.log('bikes'));

  router.route('/users.html', () => console.log('users'));
  router.route('/dashboard.html', () => console.log('dashboard'));
  router.route('/logs.html', () => console.log('logs'));

  router.route('*', authorize);
  router.start();
};

export { init };
