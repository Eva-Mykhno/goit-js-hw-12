import { renderPhotos } from './js/render-functions.js';
import { getPhotos } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import octagon from '../src/img/octagon.svg';

const form = document.querySelector('.form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const searchBtn = document.querySelector('.search-btn');
const loadBtn = document.querySelector('.load-btn');

let page = 1;
let totalHits = 0;
let userValue = '';

searchBtn.disabled = true;

loaderHide();

form.input.addEventListener('input', () => {
  searchBtn.disabled = !form.input.value.trim();
});

form.addEventListener('submit', onGallery);
loadBtn.addEventListener('click', handleLoad);

async function onGallery(event) {
  event.preventDefault();

  galleryContainer.innerHTML = '';

  loaderShow();

  userValue = event.target.elements.input.value.trim();

  if (!userValue) {
    loaderHide();
    return;
  }

  searchBtn.disabled = true;

  try {
    const data = await getPhotos(userValue, (page = 1));
    if (data && data.hits && data.hits.length) {
      renderPhotos(data.hits);
      totalHits = Math.ceil(data.totalHits / 15);
      if (page < totalHits) {
        visibilityLoad();
      } else {
        hiddenLoad();
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#EF4040',
          theme: 'dark',
          iconUrl: octagon,
          maxWidth: 354,
          messageSize: '16',
        });
      }
    } else {
      hiddenLoad();
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
  } catch (error) {
    iziToast.error({
      message: error.message,
      position: 'topRight',
      backgroundColor: '#EF4040',
      theme: 'dark',
      iconUrl: octagon,
      maxWidth: 354,
      messageSize: '16',
    });
  } finally {
    loaderHide();
    searchBtn.disabled = true;
  }

  form.reset();
}

async function handleLoad(event) {
  page += 1;
  hiddenLoad();
  loaderShow();

  try {
    const data = await getPhotos(userValue, page);
    if (data && data.hits && data.hits.length) {
      renderPhotos(data.hits);
      const cardHeight = document
        .querySelector('.gallery-item')
        .getBoundingClientRect().height;
      window.scrollBy({
        left: 0,
        top: cardHeight * 2,
        behavior: 'smooth',
      });
      if (page < totalHits) {
        visibilityLoad();
      } else {
        hiddenLoad();
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          backgroundColor: '#EF4040',
          theme: 'dark',
          iconUrl: octagon,
          maxWidth: 354,
          messageSize: '16',
        });
      }
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loaderHide();
  }
  form.reset();
}

function loaderShow() {
  loader.style.display = 'inline-block';
}

function loaderHide() {
  loader.style.display = 'none';
}

function visibilityLoad() {
  loadBtn.classList.remove('hidden');
}

function hiddenLoad() {
  loadBtn.classList.add('hidden');
}
