/* eslint no-param-reassign: off */

import store from '../utils/store';
import { generate } from '../models/bike';
import { log } from '../stores/logs';
import * as usersStore from '../stores/users';

/**
 * Small helper to group the passed bikes by stations.
 * @param  {Object[]} bikes
 * @return {Array[]} Returns an array of stations where each station is and array of bikes.
 */
const groupByStation = (bikes) =>
  bikes.reduce((result, bike) => {
    if (!result[bike.station - 1]) result[bike.station - 1] = [];
    result[bike.station - 1].push(bike);
    return result;
  }, []);

/**
 * Return all bikes or generate a certain amount
 * of bikes if it is the first call.
 * @return {Object[]} Returns the bikes.
 */
const getAll = () => {
  const bikes = store.get('bikes');
  return bikes || store.set('bikes', generate(21));
};

/**
 * Return all bikes from a specific station.
 * @param  {String} station - The station id.
 * @return {Object[]} Returns the bikes from that station.
 */
const getByStation = (station) => {
  const bikes = getAll();
  return bikes.filter((bike) => bike.station === station);
};

/**
 * Get the bike specified by the passed id.
 * @param  {String} id - The bike id.
 * @return {Object} Returns a bike or `undefined`.
 */
const get = (id) => {
  const bikes = getAll();
  return bikes.find((bike) => bike.id === id);
};

/**
 * Return the bike rented by a user if any.
 * @param  {String} email - The user email.
 * @return {Object} Returns a user bike or `undefined`.
 */
const getByUser = (email) => {
  const bikes = getAll();
  return bikes.find((bike) => bike.renter === email);
};

/**
 * Mark a bike as rented by a specific user.
 * @param {String} id    - The bike id.
 * @param {String} email - The user email.
 */
const rentBike = (id, email) => {
  const bikes = getAll();
  store.set(
    'bikes',
    bikes.map((bike) => {
      if (bike.id !== id) return bike;
      return {
        id: bike.id,
        color: bike.color,
        renter: email,
        rentedAt: new Date().getTime(),
      };
    }),
  );
  log(`bike *${id}* rented by ${email}`);
};

/**
 * Return a bike to the provided station.
 * Will ban the bike renter if isAutomatic is `true`.
 * @param {String}  id          - The bike id.
 * @param {String}  station     - The station id.
 * @param {Boolean} isAutomatic - If `true` will ban the user.
 */
const returnBike = (id, station, isAutomatic) => {
  const bikes = getAll();
  store.set(
    'bikes',
    bikes.map((bike) => {
      if (bike.id !== id) return bike;
      if (isAutomatic) usersStore.ban(bike.renter);
      const { renter, rentedAt, ...newBike } = bike;
      return { ...newBike, ...{ station } };
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
