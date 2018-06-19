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
 * Make sure all over due bikes are returned.
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
    store.get('startDate') || store.set('startDate', new Date().getTime());
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

    store.set('bikes', [...bikesInStation, ...bikesRented]);
    store.set('startDate', new Date().getTime());
  }
};

export { returnLateBikes, rearrangeBikes, RENTAL_LIMIT };
