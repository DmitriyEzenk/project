const slider = document.querySelector('.swiper');
const sliderTwo = document.querySelector('.swiper--two');
const swiperBtn = document.querySelectorAll('.swiper__btn');

const swiper = new Swiper(slider, {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 2300,
  },
  direction: 'horizontal',
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  breakpoints: {
    1200: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 2,
    },
  },
});

const mYswiper = new Swiper(sliderTwo, {
  loop: true,
  spaceBetween: 3,
  slidesPerView: 2,
  direction: 'horizontal',
});

swiperBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    const self = e.currentTarget;
    el.classList.toggle('swiper__btn--active');
  });
});

