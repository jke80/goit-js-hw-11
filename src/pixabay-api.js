import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.js';

// const API_KEY = '9908260-97928272ad9de5d3030a89b8a';
// const URL = 'https://pixabay.com/api/';

export class Pixabay {
  #API_KEY;
  #URL;
  #page;
  #searchQuery;
  #totalHits;
  #per_page;
  constructor() {
    this.#page = 1;
    this.#searchQuery = '';
    this.#API_KEY = '9908260-97928272ad9de5d3030a89b8a';
    this.#URL = 'https://pixabay.com/api/';
    this.#per_page = 40;
    this.#totalHits = 500;
  }

  async getPhotos() {
    const params = {
      key: this.#API_KEY,
      q: this.#searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#per_page,
      page: this.#page,
    };

    const response = await axios.get(this.#URL, { params });
    // console.log(response);
    this.#totalHits = response.data.totalHits;

    if (!response.data.hits.length) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response.data;
  }

  nextPage() {
    if (this.#page * this.#per_page >= this.#totalHits) {
      throw new Error(
        "We're sorry, but you've reached the end of search results."
      );
    }
    this.#page += 1;
  }
  get page() {
    return this.#page;
  }
  set page(newPage) {
    this.#page = newPage;
  }
  get searchQuery() {
    return this.#searchQuery;
  }
  set searchQuery(str) {
    this.#searchQuery = str;
  }
}
