const accordions = document.querySelectorAll('.accordion__btn');

accordions.forEach(el => {
  el.addEventListener('click', () => {
    const content = el.nextElementSibling;
    el.classList.toggle('open');
    content.classList.toggle('accordion-content--open');
  });
});

const guestBtn = document.querySelectorAll('.accordion-content__btn');
const guestOlga = document.querySelector('.guest--olga');

guestBtn.forEach(el  => {
  el.addEventListener('click', () => {
    const guestActive = document.querySelector('.accordion-content__btn--color');
    if (guestActive) {
      guestActive.classList.remove('accordion-content__btn--color')
    }
    el.classList.add('accordion-content__btn--color');
    if(el.classList.contains('accordion-content__btn--olga')) {
      guestOlga.classList.remove('guest__card');
      document.querySelector('.guest--anonim').classList.add('guest__card');
    } else {
      guestOlga.classList.add('guest__card');
      document.querySelector('.guest--anonim').classList.remove('guest__card');
    }
  });
});
