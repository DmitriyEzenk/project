const showMore = document.querySelector('.show-more');
const productsLength = document.querySelectorAll('.podcasts__item').length;
let items = 8;

showMore.addEventListener('click', ()=> {
  items += 2;
  const array = Array.from(document.querySelector('.podcasts__list').children);
  const visItems = array.slice(0, items);

  visItems.forEach(el => el.classList.add('is-visible'));

  if (visItems.length === productsLength) {
    showMore.style.display = 'none';
  };
});
