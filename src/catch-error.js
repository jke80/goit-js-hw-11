import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

export function catchError(error) {
  if (
    error.message ===
      'Sorry, there are no images matching your search query. Please try again.' ||
    error.message ===
      "We're sorry, but you've reached the end of search results."
  ) {
    Notify.failure(error.message);
  } else {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  }
}
