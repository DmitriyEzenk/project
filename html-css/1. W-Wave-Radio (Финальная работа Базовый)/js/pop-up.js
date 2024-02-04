let openPopUp = document.querySelector('.login');
let closePopUp = document.querySelector('.pop-up__close');
let popUp = document.querySelector('.pop-up');
let body = document.querySelector('.body');

openPopUp.addEventListener ('click', () => {
  popUp.classList.toggle('pop-up__active');
  body.classList.toggle('stop-scroll');
});

closePopUp.addEventListener ('click', () => {
  body.classList.remove('stop-scroll');
  popUp.classList.remove('pop-up__active');
});
