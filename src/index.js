import Notiflix from 'notiflix';
import throttle from 'lodash.throttle';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/fetch';
import { renderCard } from './js/render';
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

let page = 1;

function onSubmit(e) {
  e.preventDefault();
  const value = e.target.elements.searchQuery.value;
  clearGallery();
  page = 1;
  fetchImages(value).then(data => {
    console.dir(data);
    if (!data.data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    successNotification(data);
    refs.gallery.insertAdjacentHTML('beforeend', renderCard(data.data.hits));
    lightbox();
  });
}

async function checkPosition() {
  const height = document.body.offsetHeight;
  const screenHeight = window.innerHeight;
  const scrolled = window.scrollY;
  const threshold = height - screenHeight / 4;

  const position = scrolled + screenHeight;

  if (position >= threshold) {
    page += 1;

    const inputValue = refs.form.elements.searchQuery.value;
    await fetchImages(inputValue, page).then(data => {
      if (!data.data.hits.length) {
        window.removeEventListener('scroll', checkPosition);
        window.removeEventListener('resize', checkPosition);
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      refs.gallery.insertAdjacentHTML('beforeend', renderCard(data.data.hits));
      smoothScroll();
    });
  }
}

function lightbox() {
  const lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  refs.gallery.addEventListener('click', evt => {
    evt.preventDefault();
    lightbox.on('show.simplelightbox');
  });
  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function successNotification(data) {
  return Notiflix.Notify.success(`Hooray! We found ${data.data.total} images.`);
}

window.addEventListener('scroll', throttle(checkPosition, 300));
window.addEventListener('resize', throttle(checkPosition, 300));

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
