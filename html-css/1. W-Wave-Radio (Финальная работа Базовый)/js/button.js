// Кнопки в header, эфир
const playBtn = document.querySelectorAll('.ether__btn');
const etherBtn = document.querySelector('.ether-quest');
const etherPlay = document.querySelector('.ether');


etherBtn.addEventListener('click', () => {
  etherBtn.classList.toggle('ether-quest__open');
  etherPlay.classList.toggle('ether__open');
});

playBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    const self = e.currentTarget;
    self.classList.toggle('play');
});
});

// Кнопки подкаст play

let podcastBtn = document.querySelectorAll('.podcast__btn');

podcastBtn.forEach(el => {
  el.addEventListener('click', (e) => {
    const self = e.currentTarget;
    self.classList.toggle('play');
});
});
