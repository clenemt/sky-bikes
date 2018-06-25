import $ from './utils/dom';
import store from './utils/store';
import * as bikesStore from './stores/bikes';

const COLOR_ORDER = [
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];
const RENTAL_LIMIT = 16;
const REARRANGE_LIMIT = 48;

// Small helper to sort bikes per color
const sortBikesPerColor = (a, b) => {
  const aIndex = COLOR_ORDER.findIndex((color) => color === a.color);
  const bIndex = COLOR_ORDER.findIndex((color) => color === b.color);
  if (aIndex < bIndex) return -1;
  if (aIndex > bIndex) return 1;
  return 0;
};

/**
 * Make sure all overdue bikes are returned.
 */
const returnLateBikes = () => {
  bikesStore.getAll().forEach((bike) => {
    if (!bike.rentedAt) return;

    const difference = (new Date() - new Date(bike.rentedAt)) / 1000;
    if (difference > RENTAL_LIMIT) {
      const station = `${Math.floor(Math.random() * 3) + 1}`;
      bikesStore.returnBike(bike.id, station, true);
    }
  });
};

/**
 * Order bikes per color in each station.
 */
const rearrangeBikes = () => {
  const start =
    store.get('sb-startDate') ||
    store.set('sb-startDate', new Date().getTime());
  const difference = (new Date() - new Date(start)) / 1000;

  if (difference > REARRANGE_LIMIT) {
    const bikes = bikesStore.getAll();
    const stations = bikesStore.groupByStation(bikes);
    const sortedStations = stations.map((stationBikes) =>
      stationBikes.sort(sortBikesPerColor),
    );

    const bikesInStation = sortedStations.reduce(
      (result, station) => result.concat(station),
      [],
    );
    const bikesRented = bikes.filter((bike) => !bike.station);

    store.set('sb-bikes', [...bikesInStation, ...bikesRented]);
    store.set('sb-startDate', new Date().getTime());
  }
};

/**
 * Update the visual timer inside the header.
 */
const updateTimer = () => {
  const timer = $('#timer');
  const bikes = bikesStore.getAll().filter((bike) => bike.rentedAt);
  if (!bikes.length) return timer.empty();

  bikes.forEach((bike) => {
    const elapsedTime = Math.floor(
      (new Date() - new Date(bike.rentedAt)) / 1000,
    );
    const time = Math.max(RENTAL_LIMIT - elapsedTime, 0);
    timer.html(`<div class="site__timer">${time}</div>`);
  });
};

export { returnLateBikes, rearrangeBikes, updateTimer, RENTAL_LIMIT };
