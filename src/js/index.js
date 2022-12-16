import cardsTpl from '../templates/cards.hbs';
import '../css/common.css';
import PixabayApiService from './api';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  submitBtn: document.querySelector('button[type="submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  cardsContainer: document.querySelector('.js-cards-container'),
};

const pixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let searchQuery = '';

function onSearch(e) {
  e.preventDefault();

  pixabayApiService.query = e.currentTarget.elements.searchQuery.value;
  pixabayApiService.resetPage();
  pixabayApiService.fetchCards(searchQuery).then(hits => console.log(hits));
}

function onLoadMore() {
  pixabayApiService.fetchCards(searchQuery).then(hits => console.log(hits));
}

function appendCardsMarkup(cards) {
  refs.cardsContainer.insertAdjacentHTML('beforeend', cardsTpl(cards));
}
// Якщо реквест успішний - малюй картки зображень
// Додай у картку: зображення, кількість лайків, переглядів, коментів, скачувань
//
