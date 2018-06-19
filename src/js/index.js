import $ from './utils/dom';
import * as routes from './routes';
import { signout } from './passport';
import { rearrangeBikes, returnLateBikes, updateTimer } from './lifecycle';

routes.init();

// Launch the game lifecycle loop.
// Will check for late bikes to be returned.
// Will clean up bikes once per day.
// Will show timer of rented bike.
setInterval(() => {
  returnLateBikes();
  rearrangeBikes();
  updateTimer();
}, 500);

// Common buttons on most pages
$('#signout_button').on('click', () => signout());
$('#back_button').on('click', () => window.history.back());
