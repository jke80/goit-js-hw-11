import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { Pixabay } from './pixabay-api';

import { createMarkup } from './create-markup';
import { catchError } from './catch-error';

const pixabay = new Pixabay();
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
const target = document.querySelector('.js-guard');

const observOptions = {
  //   root: document.querySelector('#scrollArea'),
  rootMargin: '100px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(handleObserve, observOptions);

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  observer.unobserve(target);
  gallery.innerHTML = '';
  pixabay.page = 1;
  pixabay.searchQuery = event.currentTarget.elements.searchQuery.value;
  try {
    const data = await pixabay.getPhotos();
    Notify.info(`Hooray! We found ${data.totalHits} images.`);
    gallery.innerHTML = createMarkup(data.hits);
    observer.observe(target);

    const galleryLightbox = new SimpleLightbox('.link', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });

    galleryLightbox.on('show.simplelightbox');
  } catch (error) {
    catchError(error);
  }
}

async function handleObserve(event) {
  if (!event[0].isIntersecting) {
    return;
  }
  try {
    pixabay.nextPage();
    const data = await pixabay.getPhotos();
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

    const galleryLightbox = new SimpleLightbox('.link', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });

    console.log(galleryLightbox);

    galleryLightbox.on('show.simplelightbox');
  } catch (error) {
    catchError(error);
  }
}
