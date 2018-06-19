/* eslint no-use-before-define: off */

import $ from '../utils/dom';
import { signout } from '../passport';
import * as bikesStore from '../stores/bikes';
import * as userStore from '../stores/user';

const renderBike = ({ id, color, renter }, user) => `
  <div class="site__item">
    <p>Bike id is <strong>${id}</strong> and color is <strong style="color:${color}">${color}</strong>.</p>
    <button id="bike_action" class="btn btn--primary">${
      renter === user ? 'Return' : 'Rent'
    } bike</button>
  </div>
`;

const renderInformation = () => `
    <h3><span class="t-1">🎉</span> Congrats on your new rental!</h3>
    <p>You will be logged out in 5 seconds. Have fun!</p>
`;

const handleButtonClick = ({ id, renter }, user, station) => {
  if (renter === user) {
    bikesStore.returnBike(id, station);
  } else {
    bikesStore.rentBike(id, user);
  }

  informUser();
};

const informUser = () => {
  const item = $('.site__item');
  item.html(renderInformation());
  setTimeout(signout, 5000);
};

const init = (params) => {
  if (!params.id || !params.station) {
    return signout('authError');
  }

  const user = userStore.get();
  const bike = bikesStore.get(params.id);
  const container = $('.site__content');

  container.insertLast(renderBike(bike, user));
  $('#bike_action').on('click', () =>
    handleButtonClick(bike, user, params.station),
  );
};

export { init };
