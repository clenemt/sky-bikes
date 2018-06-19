import $ from '../utils/dom';
import { nav } from '../utils/router';
import { signup, isAdmin } from '../passport';

function handleFormSubmit(event) {
  event.preventDefault();

  const values = $(this).val();
  const errors = signup(values);

  if (!errors && isAdmin()) {
    return nav('/dashboard.html');
  }
  if (!errors) {
    // Simulate a random station for our user
    return nav(`/bikes.html?station=${Math.floor(Math.random() * 3) + 1}`);
  }

  return nav(`/register.html?${errors}`);
}

const init = (params) => {
  $('form').on('submit', handleFormSubmit);

  if (params.userError) {
    $('#error_placeholder').html(
      `This user already exist, please try again with a different email.`,
    );
  }
};

export { init };
