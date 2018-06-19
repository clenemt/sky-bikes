import $ from '../utils/dom';
import * as bikesStore from '../stores/bikes';
import { isAdmin, signout } from '../passport';

const renderStation = (id) => `<h3>Station ${id}</h3>`;

const renderBike = ({ id, color }, station) => `
  <a class="site__item" href="/bike.html?id=${id}&station=${station}">
    Bike id is <strong>${id}</strong> and color is <strong style="color:${color};">${color}</strong>
  </a>
`;

const init = (params) => {
  if (!params.station) {
    return signout('authError');
  }

  const bikes = isAdmin()
    ? bikesStore.getAll()
    : bikesStore.getByStation(params.station);
  const stations = bikesStore.groupByStation(bikes);

  const container = $('.site__content');
  stations.forEach((stationBikes, i) => {
    const station = i + 1;
    container.insertLast(renderStation(station));
    container.insertLast(
      stationBikes.map((bike) => renderBike(bike, station)).join(''),
    );
  });
};

export { init };
