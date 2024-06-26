import { Currencys } from '../Class/Currency';
import { notFilled, notFilledSum } from './validate';
import {
  getListCurrency,
  getYourCurrency,
  transferFundsCurrency,
} from './workApi';
import { el, setChildren } from 'redom';
import { EventEmitter } from 'events';
import { showContent } from '../../main';

const emitter = new EventEmitter();
const currencys = new Currencys(emitter);
const points =
  '...........................................................................................................................';

export async function createTabCurrency(socket) {
  const containerCurrency = document.querySelector('.currency__wrapper');

  const containerChange = document.querySelector('.currency__change');
  const changeList = el('ul', { class: 'change list--reset' });
  setChildren(containerChange, [
    el(
      'h3',
      { class: 'currency__title title' },
      'Изменение курсов в реальном времени',
    ),
    changeList,
  ]);

  if (!containerCurrency) {
    return;
  }

  emitter.on('change', (value) => {
    changeOrAddItem(currencys.getCurrency(value), changeList);
  });

  socket.onmessage = function (event) {
    currencys.setCurrency(event.data);
  };

  const objYourCurrency = await getYourCurrency();

  const currencyBox = el('div', { class: 'currency__box flex' });
  const currencyYourBox = el('div', { class: 'currency__your-box flex' });

  setChildren(currencyYourBox, createYourCurrency(objYourCurrency, points));
  setChildren(currencyBox, [currencyYourBox, createExchangeCurrency()]);
  setChildren(containerCurrency, [currencyBox, containerChange]);
  showContent();
}

function changeOrAddItem(currency, container) {
  let changeItem = document.getElementById(`${currency.getKey()}`);

  if (changeItem) {
    changeItem.lastElementChild.textContent = currency.rate;

    currency.change === 1
      ? changeItem.classList.add('change__item--up')
      : changeItem.classList.add('change__item--down');

    return;
  }

  changeItem = el('li', {
    class: 'change__item flex',
    id: `${currency.getKey()}`,
  });
  const changeText = el('p', { class: 'change__text' }, currency.getKey());
  const changeSpan = el('span', { class: 'change__span' }, points);
  const changeWell = el('p', { class: 'change__well' }, currency.rate);

  setChildren(changeItem, [changeText, changeSpan, changeWell]);
  container.append(changeItem);
}

function createYourCurrency(objYourCurrency, points) {
  const currencyYour = el('div', { class: 'currency__your box' });
  const currencyYourList = el('ul', { class: 'your list--reset' });

  for (const i in objYourCurrency) {
    const elem = objYourCurrency[i];
    if (elem.amount > 0) {
      const currencyYourItem = el('li', { class: 'your__item flex' });
      const currencyYourText = el('p', { class: 'your__text' }, `${elem.code}`);
      const currencyYourSpan = el('span', { class: 'your__span' }, points);
      const currencyYourWell = el(
        'p',
        { class: 'change__well' },
        `${elem.amount}`,
      );

      setChildren(currencyYourItem, [
        currencyYourText,
        currencyYourSpan,
        currencyYourWell,
      ]);
      currencyYourList.append(currencyYourItem);
    }
  }

  setChildren(currencyYour, [
    el('h3', { class: 'currency__title title' }, 'Ваши валюты'),
    currencyYourList,
  ]);

  return currencyYour;
}

function createExchangeCurrency() {
  const currencyExchange = el('div', { class: 'currency__exchange box' });
  const formExchange = el('form', { class: 'exchange-form flex' });
  const exchangeInputWrapper = el('div', {
    class: 'exchange-input__wrapper flex',
  });
  const exchangeSubmit = el(
    'button',
    { class: 'exchange__submit btn' },
    'Обменять',
  );

  const exchangeLabelFrom = el('label', { for: 'from' }, 'Из');
  const exchangeLabelTo = el('label', { for: 'to' }, 'в');
  const exchangeLabelSum = el('label', { for: 'sum' }, 'Сумма');

  const buttonAutocompletionFrom = el(
    'button',
    { class: 'autocompletion autocompletion--from btn', tabindex: '-1' },
    '',
  );
  const listAutocompletionFrom = el('ul', {
    class:
      'autocompletion__list autocompletion__list--from box list--reset flex',
  });
  const buttonAutocompletionTo = el(
    'button',
    { class: 'autocompletion btn', tabindex: '-1' },
    '',
  );
  const listAutocompletionTo = el('ul', {
    class:
      'autocompletion__list autocompletion__list--from box list--reset flex',
  });

  buttonAutocompletionFrom.addEventListener('click', async function (e) {
    e.preventDefault();
    errorMessage.textContent = '';

    clickAutocompletion(
      listAutocompletionFrom,
      buttonAutocompletionFrom,
      exchangeInputFrom,
    );
  });

  buttonAutocompletionTo.addEventListener('click', async function (e) {
    e.preventDefault();
    errorMessage.textContent = '';

    clickAutocompletion(
      listAutocompletionTo,
      buttonAutocompletionTo,
      exchangeInputTo,
    );
  });

  const exchangeInputFrom = el('input', {
    class: 'exchange-form__input exchange-form__input--from',
    type: 'text',
    id: 'from',
    autocomplete: 'off',
  });
  const exchangeInputTo = el('input', {
    class: 'exchange-form__input exchange-form__input--to',
    type: 'text',
    id: 'to',
    autocomplete: 'off',
  });
  const exchangeInputSum = el('input', {
    class: 'exchange-form__input exchange-form__input--sum',
    type: 'text',
    id: 'sum',
    placeholder: '0.00',
    autocomplete: 'off',
  });

  const errorMessage = el('span', { class: 'currency__error' });

  exchangeInputFrom.addEventListener('blur', function () {
    this.value = this.value.toUpperCase().split(' ').join('');
  });

  exchangeInputTo.addEventListener('blur', function () {
    this.value = this.value.toUpperCase().split(' ').join('');
  });

  exchangeInputFrom.addEventListener('focus', function () {
    errorMessage.textContent = '';
  });

  exchangeInputTo.addEventListener('focus', function () {
    errorMessage.textContent = '';
  });

  exchangeInputSum.addEventListener('focus', function () {
    errorMessage.textContent = '';
  });

  exchangeInputSum.addEventListener('keypress', function (event) {
    const value = event.target.value + event.key;
    if (!/^[0-9]+([.][0-9]*)?$/.test(value)) {
      event.preventDefault();
    }
  });

  exchangeInputSum.addEventListener('blur', function () {
    this.value = Number(this.value).toFixed(2);
  });

  formExchange.addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitForm(
      exchangeInputFrom,
      exchangeInputTo,
      exchangeInputSum,
      errorMessage,
    );

    const data = await transferFundsCurrency(
      exchangeInputFrom.value,
      exchangeInputTo.value,
      exchangeInputSum.value,
    );

    if (data.error === 'Not enough currency') {
      errorMessage.textContent = 'На валютном счёте списания нет средств';
    } else if (data.error === 'Overdraft prevented') {
      errorMessage.textContent =
        'Попытка перевести больше, чем доступно на счёте списания';
    } else {
      const containerYourCurrency = document.querySelector(
        '.currency__your-box',
      );

      containerYourCurrency.innerHTML = '';
      setChildren(
        containerYourCurrency,
        createYourCurrency(data.payload, points),
      );
    }
  });

  setChildren(exchangeInputWrapper, [
    exchangeLabelFrom,
    exchangeInputFrom,
    buttonAutocompletionFrom,
    listAutocompletionFrom,
    exchangeLabelTo,
    exchangeInputTo,
    buttonAutocompletionTo,
    listAutocompletionTo,
    exchangeLabelSum,
    exchangeInputSum,
  ]);
  setChildren(formExchange, [exchangeInputWrapper, exchangeSubmit]);
  setChildren(currencyExchange, [
    el('h3', { class: 'currency__title title' }, 'Обмен валюты'),
    formExchange,
    errorMessage,
  ]);
  return currencyExchange;
}

// При клике на автокомплит открывается меню с валютами
async function clickAutocompletion(list, button, input) {
  list.innerHTML = '';
  const listCurrency = await getListCurrency();

  listCurrency.payload.forEach((elem) => {
    const itemListAutocompletion = el('li', {
      class: 'autocompletion__item',
    });
    const buttonItem = el('button', { class: 'btn' }, elem);

    itemListAutocompletion.textContent = elem;

    // При нажатии на валюту, изменяется значение в инпут
    buttonItem.addEventListener('click', function (e) {
      e.preventDefault();
      list.classList.toggle('autocompletion__list--open');
      button.classList.toggle('new-translation__autocompletion--open');
      input.value = this.textContent;
    });

    setChildren(itemListAutocompletion, buttonItem);
    list.append(itemListAutocompletion);
  });

  list.classList.toggle('autocompletion__list--open');
  button.classList.toggle('new-translation__autocompletion--open');
}

async function submitForm(inputFrom, inputTo, inputSum, errorMessage = '') {
  const listCurrency = await getListCurrency();

  const arrInput = [inputFrom, inputTo];

  arrInput.forEach((elem) => {
    if (!notFilled(elem)) {
      errorMessage.textContent = 'Поля не заполнены';
    } else if (!notFilledSum(inputSum)) {
      errorMessage.textContent = 'Поля не заполнены или сумма равно 0.00';
    } else if (!listCurrency.payload.includes(inputTo.value)) {
      errorMessage.textContent = 'Введеные валюты не существуют';
    } else if (!listCurrency.payload.includes(inputFrom.value)) {
      errorMessage.textContent = 'Введеные валюты не существуют';
    } else {
      errorMessage.textContent = '';
    }
  });
}
