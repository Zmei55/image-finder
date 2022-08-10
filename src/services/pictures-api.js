const API_KEY = '29121921-8e5b9c13e3f0ecc46ac9f6034';
const BASE_URL = 'https://pixabay.com/api';

export default class PicturesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPictures() {
    return fetch(
      `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=12&image_type=photo&orientation=horizontal&safesearch=true`,
    ).then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(new Error('Something went wrong!'));
    });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery.trim();
  }
}
