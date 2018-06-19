import $ from './utils/dom';
import * as routes from './routes';
import { signout } from './passport';
import { rearrangeBikes, returnLateBikes } from './lifecycle';

routes.init();

// Launch the game lifecycle loop.
// Will check for late bikes to be returned
// and will clean up bikes once per day.
setInterval(() => {
  returnLateBikes();
  rearrangeBikes();
}, 500);

// Common buttons on most pages
$('#signout_button').on('click', () => signout());
$('#back_button').on('click', () => window.history.back());
