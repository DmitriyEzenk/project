let searchBtn = document.querySelector('.search__button');
let searchInput = document.querySelector('.search__input');

searchBtn.addEventListener('click', () => {
  searchInput.classList.toggle('search__input--active');
  searchInput.value = "";
});
