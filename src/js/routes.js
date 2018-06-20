import { isLoggedIn, signout, isAdmin, isBanned } from './passport';
import * as router from './utils/router';
import * as logs from './pages/logs';
import * as bike from './pages/bike';
import * as login from './pages/login';
import * as bikes from './pages/bikes';
import * as users from './pages/users';
import * as register from './pages/register';

/**
 * Middleware for authenticating routes.
 * Will signout the user if trying to access restricted routes.
 * @param  {Boolean} requireAdmin
 * @return {Function}
 */
const authorize = (requireAdmin) => () => {
  if (!isLoggedIn()) return signout('authError');
  if (isBanned()) return signout('banError');
  if (!requireAdmin) return true;
  return isAdmin() || signout('authError');
};

const init = () => {
  router.route('/index.html', login.init);
  router.route('/register.html', register.init);
  router.route('/bike.html', authorize(), bike.init);
  router.route('/bikes.html', authorize(), bikes.init);

  router.route('/users.html', authorize(true), users.init);
  router.route('/logs.html', authorize(true), logs.init);

  router.start();
};

export { init, authorize };
