import axios from 'axios';

export default function fetchCards(query, page) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '32114919-b1da84808ca0f604bcef4a7c4';

  let url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=200&page=${page}`;

  return axios.get(url).then(response => {
    return response.data;
  });
}
