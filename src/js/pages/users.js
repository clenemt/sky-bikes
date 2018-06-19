import $ from '../utils/dom';
import * as usersStore from '../stores/users';
import * as bikesStore from '../stores/bikes';
import { RENTAL_LIMIT } from '../lifecycle';

const renderUser = (user, bike) => {
  const elapsedTime =
    bike && Math.floor((new Date() - new Date(bike.rentedAt)) / 1000);
  return `
    <div class="site__item d-flex">
      <div>
        <p class="mb-1">${user.firstname} <strong>${user.lastname}</strong></p>
        <p class="mb-1">${user.email}</p>
        <p class="mb-1">${user.phone}</p>
        ${
          bike
            ? `<p class="mb-1">Renting bike <strong>${
                bike.id
              }</strong> with color <strong style="color:${bike.color};">${
                bike.color
              }</strong>.</p>
           <p class="mb-1">Will be banned in <strong>${Math.max(
             RENTAL_LIMIT - elapsedTime,
             0,
           )} sec</strong>.</p>`
            : ``
        }
        ${
          user.banned
            ? `<p class="t-red mb-1">This user is <strong>banned</strong> from renting.</p>`
            : ``
        }
      </div>
      <img class="ml-auto align-self-center" src="https://api.adorable.io/avatars/100/${
        user.email
      }.png">
    </div>`;
};

const init = () => {
  const users = usersStore.getAll();
  const bikes = bikesStore.getAll();

  const container = $('.site__content');
  users.forEach((user) => {
    const rentedBike = bikes.find((bike) => bike.renter === user.email);
    container.insertLast(renderUser(user, rentedBike));
  });
};

export { init };
