import axios from 'axios';

export default async function fetchCards(query, page) {
  const BASE_URL = 'https://pixabay.com/api';
  const API_KEY = '32114919-b1da84808ca0f604bcef4a7c4';

  let url = `${BASE_URL}/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;

  return await axios
    .get(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Error!`);
    })
    .then(data => {
      return data;
    });
}
