import '../css/common.css';
import fetchCards from './api';
import { Notify } from 'notiflix';

// Receive access to HTML elements

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('input[name="searchQuery"]'),
  submitBtn: document.querySelector('button[type="submit]'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  cardsContainer: document.querySelector('.js-cards-container'),
};

// Additional vars declaration

let page = 1;

// 'Load more' btn initial state

refs.loadMoreBtn.style.display = 'none';

// Handle 'Submit' btn event

refs.input.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  clearResults();

  const inputValue = refs.input.value.trim();

  // if input fiels is empty, clear search results
  if (inputValue) {
    fetchCards(inputValue, page).then(data => {
      if (data.totalHits > 0) {
        createMarkup(data.hits);
        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        refs.loadMoreBtn.style.display = 'block';
      } else {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    });
  }
}

// Handle 'Load more' btn event

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore() {
  page += 1;
  refs.loadMoreBtn.style.display = 'none';
  const inputValue = refs.input.value.trim();

  fetchCards(inputValue, page).then(data => {
    if (data.totalHits > 40) {
      refs.loadMoreBtn.style.display = 'block';
    } else {
      refs.loadMoreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  });
}

// Create image card markup

function createMarkup(images) {
  const markup = images
    .map(image => {
      return `<div class="photo-card">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${image.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${image.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${image.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>
          ${image.downloads}
        </p>
      </div>
    </div>`;
    })
    .join('');

  refs.gallery.innerHTML += markup;
}

// Clear serch results

function clearResults() {
  refs.gallery.innerHTML = '';
  refs.loadMoreBtn.style.display = 'none';
  page = 1;
}
