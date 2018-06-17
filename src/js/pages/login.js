import $ from '../utils/dom';
import { nav } from '../utils/router';
import { signin } from '../passport';

function handleFormSubmit(event) {
  event.preventDefault();

  const values = $(this).val();
  if (!values.email) return;

  if (!signin(values.email)) {
    nav('/index.html?userError');
  } else {
    // Simulate a random station for our user
    nav(`/bikes.html?station=${Math.floor(Math.random() * 3) + 1}`);
  }
}

const init = (params) => {
  $('form').on('submit', handleFormSubmit);

  if (params.userError) {
    $('#error_placeholder').html(`Please login with a valid email or signup first.`);
  }

  if (params.authError) {
    $('#error_placeholder').html(`Please login before trying to use the service.`);
  }
};

export { init };
