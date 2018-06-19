import $ from '../utils/dom';
import * as bikesStore from '../stores/bikes';
import { isAdmin, signout } from '../passport';

const renderStation = (id) => `<h3>Station ${id}</h3>`;

const renderBike = ({ id, color }, station) => `
  <p>
    <a href="/bike.html?id=${id}&station=${station}">Bike id is ${id} and color is <span style="color:${color};">${color}</span></a>
  </p>
`;

const init = (params) => {
  if (!params.station) {
    return signout('authError');
  }

  const bikes = isAdmin()
    ? bikesStore.getAll()
    : bikesStore.getByStation(params.station);
  const stations = bikesStore.groupByStation(bikes);

  const container = $('.container');
  stations.forEach((stationBikes, i) => {
    const station = i + 1;
    container.insertLast(renderStation(station));
    container.insertLast(
      stationBikes.map((bike) => renderBike(bike, station)).join(''),
    );
  });
};

export { init };
