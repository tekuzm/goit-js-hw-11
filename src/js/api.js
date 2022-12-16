import axios from 'axios';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchCards() {
    console.log(this);

    const API_KEY = '32114919-b1da84808ca0f604bcef4a7c4';

    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
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
    return (this.searchQuery = newQuery);
  }
}
