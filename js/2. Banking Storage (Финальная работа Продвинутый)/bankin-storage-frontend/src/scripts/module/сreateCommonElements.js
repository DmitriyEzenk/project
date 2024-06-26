import { el, setChildren } from 'redom';
import { removeToken } from './token';

// Всплывающее модальное окно подтверждения выхода
export function createPopUp() {
  const containerPopUp = document.querySelector('.popUp');

  if (!containerPopUp) {
    return;
  }

  const popUpWrapper = el('div', { class: 'popUp__wrapper flex' });
  const popUpButtonWrapper = el('div', {
    class: 'popUp__button-wrapper flex',
  });

  setChildren(containerPopUp, popUpWrapper);
  setChildren(popUpWrapper, [
    el('h2', { class: 'popUp__title title' }, 'Вы действительно хотите выйти?'),
    popUpButtonWrapper,
  ]);
  setChildren(popUpButtonWrapper, [
    el('button', { class: 'popUp__yes btn' }, 'Да'),
    el('button', { class: 'popUp__no btn' }, 'Нет'),
  ]);
}

// Навигация для всех страниц, кроме страницы с авторизацией
export function createNavigationList() {
  const containerNav = document.querySelector('.nav');

  if (!containerNav) {
    return;
  }
  const list = el('ul', { class: 'nav__list list--reset flex' });
  const itemBanks = el('li', { class: 'nav__item' });
  const itemCurrency = el('li', { class: 'nav__item' });
  const itemAccounts = el('li', { class: 'nav__item' });
  const itemExit = el('li', { class: 'nav__item' });

  const buttonExit = el('button', { class: 'nav__link btn' }, 'Выйти');
  // При выходе появляется модальное окно с подтверждением,
  // Если положительное - локальное хранилище очищается, и переходим на страницу с авторизацией
  buttonExit.addEventListener('click', () => {
    const popUp = document.querySelector('.popUp');
    const popUpYes = document.querySelector('.popUp__yes');
    const popUpNo = document.querySelector('.popUp__no');
    popUp.classList.add('popUp__open');
    document.body.classList.add('no-visible');

    popUpNo.addEventListener('click', () => {
      popUp.classList.remove('popUp__open');
      document.body.classList.remove('no-visible');
    });

    popUpYes.addEventListener('click', () => {
      window.location.href = 'index.html';
      removeToken();
    });
  });

  setChildren(itemExit, buttonExit);
  setChildren(
    itemCurrency,
    el('a', { class: 'nav__link', href: 'currency.html' }, 'Валюта'),
  );
  setChildren(
    itemAccounts,
    el('a', { class: 'nav__link', href: 'account.html' }, 'Счета'),
  );
  setChildren(
    itemBanks,
    el('a', { class: 'nav__link', href: 'banks.html' }, 'Банкоматы'),
  );
  setChildren(list, [itemBanks, itemAccounts, itemCurrency, itemExit]);
  setChildren(containerNav, list);
}
