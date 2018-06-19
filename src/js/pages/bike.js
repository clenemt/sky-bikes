/* eslint no-use-before-define: off */

import $ from '../utils/dom';
import { signout } from '../passport';
import * as bikesStore from '../stores/bikes';
import * as userStore from '../stores/user';

const renderBike = ({ id, color, renter }, user) => `
  <div>
    <p>Bike id is ${id} and color is <span style="color:${color}">${color}</span></p>
    <button id="bike_action" class="btn">${
      renter === user ? 'Return' : 'Rent'
    } bike</button>
  </div>
`;

const handleButtonClick = ({ id, renter }, user, station) => {
  if (renter === user) {
    bikesStore.returnBike(id, station);
  } else {
    bikesStore.rentBike(id, user);
  }

  signout();
};

const init = (params) => {
  if (!params.id || !params.station) {
    return signout('authError');
  }

  const user = userStore.get();
  const bike = bikesStore.get(params.id);
  const container = $('.container');

  container.html(renderBike(bike, user));
  $('#bike_action').on('click', () =>
    handleButtonClick(bike, user, params.station),
  );
};

export { init };
