const axios = require('axios');
import Notiflix from 'notiflix';
import { fetchImages } from './js/fetch';
import { renderCard } from './render';
const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const inputValue = e.target.elements.searchQuery.value;
  fetchImages(inputValue).then(data => {
    refs.gallery.insertAdjacentHTML('beforeend', renderCard(data.hits));
    console.log(data.hits);
  });
}
