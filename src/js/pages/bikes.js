import $ from '../utils/dom';
import * as bikeStore from '../stores/bike';

const renderBike = ({ id, color }) => `
  <p>Bike id is ${id} and color is <span style="color:${color};">${color}</span></p>
`;

const init = (params) => {
  const bikes = bikeStore.getByStation(params.station);
  const container = $('.container');

  bikes.forEach((bike) => {
    container.insertLast(renderBike(bike));
  });
};

export { init };
