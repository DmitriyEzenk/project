/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import 'babel-polyfill';
import Choices from 'choices.js';

// Импорт файлов для отслеживания devServer
import './index.html';
import './account.html';
import './viewAccount.html';
import './historyBalance.html';
import './currency.html';
import './banks.html';
import './style/main.scss';

// Импорт функциий из папки module
import { createLoginForm } from './scripts/module/createTabLoginForm';
import {
  createNavigationList,
  createPopUp,
} from './scripts/module/сreateCommonElements';
import { getMapMarkers, transferFunds } from './scripts/module/workApi';
import { loadAccounts } from './scripts/module/createLoadAccount';
import { viewAccount } from './scripts/module/createTabViewAccount';
import { createTabHistoryBalance } from './scripts/module/createTabHistoryBalance';
import { createTabCurrency } from './scripts/module/createTabCurrency';
import { validateLoginForm } from './scripts/module/validate';

init();

// После создания элементов страницы входа, эскпортируем для работы с API, а так же ключ для обращения в локальное хранилище
export const inputLogin = document.getElementById('login');
export const inputPassword = document.getElementById('password');
export const errorMessage = document.getElementById('error-login');
export const keyToken = 'userToken';

// Получение URL адреса номера счета
export function getUrl() {
  // Создаем объект URL из текущего адреса страницы
  const url = new URL(window.location.href);
  // Доступ к параметрам можно получить через объект URLSearchParams
  const params = new URLSearchParams(url.search);
  // Извлекаем значение параметра 'accountNumber'
  const accountId = params.get('accountNumber');

  return accountId;
}

// Скрывает спиннер и показывает контент
export function showContent() {
  document.querySelector('.spinner__wrapper').style.display = 'none';
  document.querySelector('.main__page').style.display = 'block';
}

// Инициализация
function init() {
  createLoginForm(); // Создание страницы с авторизацией
  createPopUp(); // Создание модального окна для выхода из аккаунта
  createNavigationList(); // Создание навигации для всех страниц кроме страницы с навигацией
  loadAccounts(); // Загрузка всех существующих счетов
  viewAccount(); // Страница с просмотром информации о счете
  createTabHistoryBalance(); // Страница с просмотром подробной информации о балансе
  const socket = initSocket(); // Инициализация работы websocket
  createTabCurrency(socket); // Страница с валютами

  // Получение input Формы входа
  const inputLogin = document.getElementById('login');
  const inputPassword = document.getElementById('password');

  if (inputLogin && inputPassword) {
    const viewBtn = document.querySelector('.view-btn');

    // При фокусе очищаем ошибки, если больше 6 символов
    inputLogin.addEventListener('focus', () => {
      if (validateLoginForm(inputLogin) && validateLoginForm(inputPassword)) {
        errorMessage.textContent = '';
      }
    });
    inputPassword.addEventListener('focus', () => {
      if (validateLoginForm(inputLogin) && validateLoginForm(inputPassword)) {
        errorMessage.textContent = '';
      }

      viewBtn.classList.add('view-btn--focus');
    });

    // при потере фокуса удаляем пробелы
    inputLogin.addEventListener('blur', function () {
      this.value = this.value.split(' ').join('').trim();
    });
    inputPassword.addEventListener('blur', function () {
      this.value = this.value.split(' ').join('').trim();
      viewBtn.classList.remove('view-btn--focus');
    });

    // При вводе очищаем ошибки, если больше 6 символов
    inputLogin.addEventListener('input', () => {
      if (validateLoginForm(inputLogin) && validateLoginForm(inputPassword)) {
        errorMessage.textContent = '';
      }
    });
    inputPassword.addEventListener('input', () => {
      if (validateLoginForm(inputLogin) && validateLoginForm(inputPassword)) {
        errorMessage.textContent = '';
      }
    });
  }

  // Подключение библиотеки Choices для select
  const elementSelect = document.querySelector('.account__select');

  if (elementSelect) {
    const choices = new Choices(elementSelect, {
      searchEnabled: false,
    });
  }

  // При переходе между страницами кнопки навигации становяться активными
  const navLinkArr = document.querySelectorAll('.nav__link');

  navLinkArr.forEach((element) => {
    if (element.href === window.location.href) {
      element.classList.add('nav__link--active');
    } else {
      element.classList.remove('nav__link--active');
    }
  });

  // Подключение Яндекс карт если существует контейнер с id='map'
  const mapContainer = document.getElementById('map');

  if (mapContainer) {
    ymaps.ready(initMap);

    async function initMap() {
      let myMap = new ymaps.Map('map', {
        center: [55.7418437, 37.6211812], // Координаты центра карты
        zoom: 11, // Уровень масштабирования
      });

      // Создание меток на карте
      const mapMarkers = await getMapMarkers();

      mapMarkers.forEach((elem) => {
        let myPlacemark = new ymaps.Placemark(elem);
        myMap.geoObjects.add(myPlacemark);
      });
      showContent();
    }
  }
}

function initSocket() {
  let socket = new WebSocket('ws://localhost:3000/currency-feed');

  return socket;
}
