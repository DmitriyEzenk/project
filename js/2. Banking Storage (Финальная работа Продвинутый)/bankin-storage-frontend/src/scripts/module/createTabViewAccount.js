/* eslint-disable prettier/prettier */
import { el, setChildren } from 'redom';
import { getAccountById, transferFunds } from './workApi';
import { Account } from '../Class/Account';
import { createCanvasGraph } from './createCanvasGraph';
import { getUrl, showContent } from '../../main';
import { validateEmptyInput, validateNumberLength, validateTransferFunds } from './validate';

export async function viewAccount() {
  const containerView = document.querySelector('.view__bottom');
  const viewBox = el('div', { class: 'view__box flex' });

  if (!containerView) {
    return;
  }

  // Получение номера счета через URL
  const url = getUrl();
  const account = await getAccountById(url);
  const accountItem = new Account(await getAccountById(url));

  // Создание контейнера динамики баланса для вкладки Просмотра счета
  const containerDynamicsBalance = el('div', { class: 'balance-dynamics box' });

  // Заполняем данными вкладку Просмотр счета
  setChildren(viewBox, [
    createFormNewTranslation(account, viewBox),
    createCanvasGraph(account, containerDynamicsBalance, 600, 200),
    accountItem.createHistoryTranslation(),
  ]);
  setChildren(containerView, accountItem.createInfoAccount(), viewBox);

  showContent();
}

// Создание формы для переводов
function createFormNewTranslation(account, containerViewBox) {
  const containerNewTranslation = el('div', { class: 'new-translation' });
  const formNewTranslation = el('form', { class: 'new-translation__form flex' });
  const wrapperInputNumber = el('div', { class: 'new-translation__wrapper flex' });
  const wrapperInputSum = el('div', { class: 'new-translation__wrapper flex' });
  const buttonSubmit = el('button', { class: 'view__btn new-translation__btn btn flex' }, 'Отправить');
  const inputNumber = el('input', { class: 'new-translation__input', type: 'text', id: 'number-account', autocomplete: 'off' });
  const inputSum = el('input', { class: 'new-translation__input', type: 'text', id: 'sum-account', placeholder: '0.00'});
  const buttonAutocompletion = el('button', {class: 'autocompletion btn', tabindex: '-1'}, '');
  const listAutocompletion = el('ul', { class: 'autocompletion__list box list--reset'});
  const errorForm = el('p', {class: 'new-translation__error'})

  setChildren(containerNewTranslation, [
    el('h3', { class: 'view__title title' }, 'Новый перевод'),
    formNewTranslation
  ]);
  setChildren(formNewTranslation, [
    wrapperInputNumber, wrapperInputSum, buttonSubmit, errorForm
  ]);
  setChildren(wrapperInputNumber, [
    el(
      'label',
      { class: 'new-translation__label', for: 'number-account' },
      'Номер счёта получателя',
    ),
    inputNumber,
    buttonAutocompletion,
    listAutocompletion
  ]);
  setChildren(wrapperInputSum, [
    el(
      'label',
      { class: 'new-translation__label', for: 'sum-account' },
      'Сумма перевода',
    ),
    inputSum
  ]);

  const autocompletion = 'autocompletion';
  let arrAutocompletion = JSON.parse(localStorage.getItem(autocompletion)) || [];

  // При клике открывается меню счетов использованные ранее
  buttonAutocompletion.addEventListener('click', function(e) {
    e.preventDefault();
    listAutocompletion.innerHTML = '';
    arrAutocompletion = JSON.parse(localStorage.getItem(autocompletion));

    if (arrAutocompletion) {
      arrAutocompletion.forEach((elem) => {
        const buttonItem = el('button', {class: 'btn'}, elem);
        const itemListAutocompletion = el('li', {class: 'new-translation__item'});
        setChildren(itemListAutocompletion, buttonItem)
        listAutocompletion.append(itemListAutocompletion);

        // При клике скрываем меню и в input заносим данные с выбранного меню
        buttonItem.addEventListener('click', function (e) {
          e.preventDefault();
          listAutocompletion.classList.toggle('autocompletion__list--open');
          buttonAutocompletion.classList.toggle('new-translation__autocompletion--open');
          inputNumber.value = this.textContent
        })
      })
    }

    listAutocompletion.classList.toggle('autocompletion__list--open');
    buttonAutocompletion.classList.toggle('new-translation__autocompletion--open');
  });

  inputNumber.addEventListener('keypress', function (event) {
    const value = event.target.value + event.key;
    if (!/^\d{1,26}$/.test(value)) {
      event.preventDefault();
    }
  });

  inputNumber.addEventListener('focus', () => {
    errorForm.textContent = '';
  });

  inputSum.addEventListener('keypress', function(event) {
    const value = event.target.value + event.key;
    if (!/^[0-9]+([.][0-9]*)?$/.test(value)) {
      event.preventDefault();
    }
  });

  inputSum.addEventListener('focus', () => {
    errorForm.textContent = '';
  })

  inputSum.addEventListener('blur', function () {
    this.value = Number(this.value).toFixed(2);
  })

  // При отправке перевода происходит валидация и сохранение счета в локальное хранилище
  // для автозаполнения
  formNewTranslation.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (arrAutocompletion && errorForm.textContent === '') {
      console.log(arrAutocompletion);
      if (!arrAutocompletion.includes(inputNumber.value)) {
        arrAutocompletion.push(inputNumber.value)
      }
    }

    // Получаем объект при отправке формы
    const data = await transferFunds(account.account, inputNumber.value, inputSum.value);

    // Если валидация успешна сохраняем счет в локальное хранилище и строим заново данные страницы
    if (validateEmptyInput(inputNumber.value, inputSum.value, errorForm) &&
      validateTransferFunds(data, errorForm) &&
      validateNumberLength(inputNumber, errorForm)
    ) {
      if (errorForm.textContent === '') {
        localStorage.setItem(autocompletion, JSON.stringify(arrAutocompletion));
      }

      containerViewBox.innerHTML = '';
      viewAccount();
    }

  })

  return containerNewTranslation;
}

