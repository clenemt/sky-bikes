import { isUserLoggedIn } from './passport';
import * as router from './utils/router';
import * as login from './pages/login';
import * as register from './pages/register';
import * as bikes from './pages/bikes';

const authorize = () => {
  if (!isUserLoggedIn()) router.nav('/index.html?authError');
};

const init = () => {
  router.route('/index.html', login.init);
  router.route('/register.html', register.init);
  router.route('/bike.html', authorize, () => console.log('bike'));
  router.route('/bikes.html', authorize, bikes.init);

  router.route('/users.html', authorize, () => console.log('users'));
  router.route('/dashboard.html', authorize, () => console.log('dashboard'));
  router.route('/logs.html', authorize, () => console.log('logs'));

  router.start();
};

export { init };
