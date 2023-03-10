import '../sass/index.scss';
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

let images;
let page = 1;
let isLoading = false;

// 'Load more' btn initial state

refs.loadMoreBtn.style.display = 'none';

// Handle 'Submit' btn event

refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  if (isLoading) {
    return;
  }

  isLoading = true;
  clearResults(true);

  const inputValue = refs.input.value.trim();

  // if input fiels is empty, clear search results
  if (inputValue) {
    fetchCards(inputValue, page)
      .then(data => {
        isLoading = false;

        if (data.totalHits > 0) {
          images = data.hits;
          createMarkup(images);
          Notify.success(`Hooray! We found ${data.totalHits} images.`);

          refs.loadMoreBtn.style.display = 'block';
        } else {
          Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      })
      .catch(error => {
        Notify.failure('Sorry, something went wrong. Try again later.');
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
    debugger;
    images = images.concat(data.hits);

    if (images.length < data.totalHits) {
      refs.loadMoreBtn.style.display = 'block';
    } else {
      refs.loadMoreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    clearResults();
    createMarkup(images);
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
          <b>Likes</b>
          ${image.likes}
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

function clearResults(toRemoveBtn) {
  if (toRemoveBtn === true) {
    refs.loadMoreBtn.style.display = 'none';
  }
  refs.gallery.innerHTML = '';
  page = 1;
}
