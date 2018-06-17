import store from '../utils/store';
import { generate } from '../models/bike';

const get = () => {
  const bikes = store.get('bikes');
  return bikes || store.set('bikes', generate(21));
};

const getByStation = (station) => {
  const bikes = get();
  return bikes.filter((bike) => bike.station === station);
};

export { get, getByStation };
