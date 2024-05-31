import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

function templatePhotos(images) {
  return images
    .map(image => {
      return `<li class="gallery-item">
  <a class="gallery-link" href="${image.largeImageURL}">
    <img
      class="gallery-image"
      src="${image.webformatURL}"
      data-source="${image.largeImageURL}"
      alt="Tags: ${image.tags}. Likes: ${image.likes},   Views: ${image.views},   Comments: ${image.comments},   Downloads: ${image.downloads}"
    />
  </a>
  <div class="gallery-item-info">
  <p class="info-image"><b class="info-image-text">Likes</b><span class="info-image-number">${image.likes}</span></p>
  <p class="info-image"><b class="info-image-text">Views</b><span class="info-image-number">${image.views}</span></p>
  <p class="info-image"><b class="info-image-text">Comments</b><span class="info-image-number">${image.comments}</span></p>
  <p class="info-image"><b class="info-image-text">Downloads</b><span class="info-image-number">${image.downloads}</span></p>
  </div>
</li>`;
    })
    .join('');
}

const lightbox = new SimpleLightbox('.gallery a', {
  overlayOpacity: 0.8,
  captionsData: 'alt',
  captionDelay: 250,
  className: 'modal-image',
});

export function renderPhotos(images) {
  const markUp = templatePhotos(images);
  gallery.insertAdjacentHTML('beforeend', markUp);
  lightbox.refresh();
}
