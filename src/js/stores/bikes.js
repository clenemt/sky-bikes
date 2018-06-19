/* eslint no-param-reassign: off */

import store from '../utils/store';
import { generate } from '../models/bike';
import { log } from '../stores/logs';
import * as usersStore from '../stores/users';

const getAll = () => {
  const bikes = store.get('bikes');
  return bikes || store.set('bikes', generate(21));
};

const getByStation = (station) => {
  const bikes = getAll();
  return bikes.filter((bike) => bike.station === station);
};

const get = (id) => {
  const bikes = getAll();
  return bikes.find((bike) => bike.id === id);
};

const getByUser = (user) => {
  const bikes = getAll();
  return bikes.find((bike) => bike.renter === user);
};

const groupByStation = (bikes) =>
  bikes.reduce((result, bike) => {
    if (!result[bike.station - 1]) result[bike.station - 1] = [];
    result[bike.station - 1].push(bike);
    return result;
  }, []);

const rentBike = (id, user) => {
  const bikes = getAll();
  store.set(
    'bikes',
    bikes.map((bike) => {
      if (bike.id !== id) return bike;
      return {
        id: bike.id,
        color: bike.color,
        renter: user,
        rentedAt: new Date().getTime(),
      };
    }),
  );

  log(`bike *${id}* rented by *${user}*`);
};

const returnBike = (id, station, isAutomatic) => {
  const bikes = getAll();
  store.set(
    'bikes',
    bikes.map(({ renter, rentedAt, ...bike }) => {
      if (bike.id !== id) return bike;
      if (isAutomatic) usersStore.ban(renter);
      return { ...bike, ...{ station } };
    }),
  );
  log(`bike *${id}* returned at station *${station}*`);
};

export {
  get,
  getAll,
  getByStation,
  getByUser,
  rentBike,
  returnBike,
  groupByStation,
};
