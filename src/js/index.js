import $ from './utils/dom';
import { nav } from './utils/router';
import * as routes from './routes';
import { signout } from './passport';

routes.init();

$('#signout').on('click', () => {
  signout();
  nav('/index.html');
});
