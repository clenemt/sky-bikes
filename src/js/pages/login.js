import $ from '../utils/dom';
import { nav } from '../utils/router';
import { signin, isAdmin } from '../passport';
import { getByUser } from '../stores/bikes';

function handleFormSubmit(event) {
  event.preventDefault();

  const values = $(this).val();
  if (!values.email) return;

  if (!signin(values.email)) {
    return nav('/index.html?userError');
  }

  if (isAdmin()) {
    return nav(`/dashboard.html`);
  }

  // Simulate a random station for our user
  const station = Math.floor(Math.random() * 3) + 1;
  const bike = getByUser(values.email);

  if (bike) {
    return nav(`/bike.html?id=${bike.id}&station=${station}`);
  }

  return nav(`/bikes.html?station=${station}`);
}

const init = (params) => {
  $('form').on('submit', handleFormSubmit);

  if (params.userError) {
    $('#error_placeholder').html(
      `Please login with a valid email or signup first.`,
    );
  }

  if (params.authError) {
    $('#error_placeholder').html(
      `Please login before trying to use the service.`,
    );
  }
};

export { init };
