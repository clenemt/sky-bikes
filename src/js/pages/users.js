import $ from '../utils/dom';
import * as usersStore from '../stores/users';
import * as bikesStore from '../stores/bikes';
import { RENTAL_LIMIT } from '../lifecycle';

const renderUser = (user, bike) => {
  const elapsedTime =
    bike && Math.floor((new Date() - new Date(bike.rentedAt)) / 1000);
  return `
    <div>
      <p>user: ${user.firstname} ${user.lastname}</p>
      <p>email: ${user.email}</p>
      <p>phone: ${user.phone}</p>
      ${
        bike
          ? `<p>bike: ${bike.id} of color <span style="color:${bike.color};">${
              bike.color
            }</span></p>
         <p>time remaining: ${Math.max(RENTAL_LIMIT - elapsedTime, 0)} sec</p>`
          : ``
      }
      ${user.banned ? `<p>banned: true</p>` : ``}
    </div>`;
};

const init = () => {
  const users = usersStore.getAll();
  const bikes = bikesStore.getAll();

  const container = $('.container');
  users.forEach((user) => {
    const rentedBike = bikes.find((bike) => bike.renter === user.email);
    container.insertLast(renderUser(user, rentedBike));
  });
};

export { init };
