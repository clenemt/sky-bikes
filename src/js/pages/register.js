import $ from '../utils/dom';
import { nav } from '../utils/router';
import { signup, isUserAdmin } from '../passport';

function handleFormSubmit(event) {
  const values = $(this).val();
  const errors = signup(values);

  if (!errors && isUserAdmin()) {
    nav('/dashboard.html');
  } else if (!errors) {
    nav('/bikes.html');
  } else {
    nav(`/register.html?${errors}`);
  }

  event.preventDefault();
}

const init = (params) => {
  $('form').on('submit', handleFormSubmit);

  if (params.userError) {
    $('#error_placeholder').html(`This user already exist, please try with a different email.`);
  }
};

export { init };
