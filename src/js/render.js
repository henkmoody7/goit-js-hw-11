export function renderCard(arr) {
  return arr.reduce(
    (acc, obj) =>
      acc +
      ` <div class="photo-card">
      <a href="${obj.largeImageURL}"><img src="${obj.webformatURL}" alt="${obj.tags}" class='gallery__image' loading="lazy" /></a>
     <div class="info">
     <p class="info-item">
      <b>Likes ${obj.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${obj.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${obj.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${obj.downloads}</b>
    </p>
  </div>
</div>`,
    ''
  );
}
