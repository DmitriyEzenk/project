/* eslint-disable prettier/prettier */
import { el, setChildren } from 'redom';

export class Account {
  constructor(obj) {
    this.accountNumber = obj.account;
    this.accountSavings = obj.balance;
    this.accountTransactions = obj.transactions;
    this.count = this.accountTransactions.length;
    if (obj.transactions[0]) {
      this.accountTime = new Date(obj.transactions[0].date);
    }
  }

  set accountTime(time) {
    const months = [
      'января',
      'февраля',
      'марта',
      'апреля',
      'мая',
      'июня',
      'июля',
      'августа',
      'сентября',
      'октября',
      'ноября',
      'декабря',
    ];
    const fullTime = time;
    const date = fullTime.getDate();
    const monthIndex = fullTime.getMonth();
    const year = fullTime.getFullYear();
    this._accountTime = `${date} ${months[monthIndex - 1]} ${year}`;
  }

  get accountTime() {
    return this._accountTime;
  }

  createElement() {
    const accountContainer = document.getElementById('account__list');
    if (!accountContainer) {
      return;
    }

    const accountItem = el('li', { class: 'account__item' });
    const article = el('article', { class: 'article flex' });
    const articleWrapper = el('div', { class: 'article__wrapper flex' });

    setChildren(articleWrapper, [
      el(
        'span',
        { class: 'article__last-transaction' },
        'Последняя транзакция:',
      ),
      el('p', { class: 'article__time' }, `${this.accountTime || '-'}`),
    ]);
    setChildren(article, [
      el('h3', { class: 'article__title title' }, this.accountNumber),
      el('p', { class: 'article__savings' }, this.accountSavings + ' ₽'),
      articleWrapper,
      el(
        'a',
        {
          href: `viewAccount.html?accountNumber=${this.accountNumber}`,
          class: 'article__link',
          // target: '_blank'
        },
        'Открыть',
      ),
    ]);
    setChildren(accountItem, article);
    accountContainer.append(accountItem);
  }

  createInfoAccount() {
    const containerInfo = el('div', { class: 'view__info flex' });
    const balanceWrapper = el(
      'p',
      { class: 'view__balance' },
      `${this.accountSavings} ₽`,
    );

    setChildren(containerInfo, [
      el('p', { class: 'view__number-account' }, `№ ${this.accountNumber}`),
      balanceWrapper,
    ]);

    balanceWrapper.prepend(
      el('span', { class: 'view__balance-name' }, 'Баланс'),
    );

    return containerInfo;
  }

  // Логика переключения слайдера где count - номер страницы
  switchTransactionList(count = this.account, container) {
    for (let i = count; i > count - 10; i--) {
      if (this.accountTransactions[i]) {
        // Выведение даты в правильном формате
        const date = new Date(this.accountTransactions[i].date);
        const day =
            date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
        const month =
            date.getMonth() + 1 < 10
              ? `0${date.getMonth() + 1}`
              : `${date.getMonth() + 1}`;
        const normalDate = `${day}.${month}.${date.getFullYear()}`;

        // Правильное отображение суммы переводов (отрицательное если отправитель - текущий счет)
        // (положительное если получатель - текущий счет)
        const normalAmount =
            this.accountTransactions[i].from !== this.accountNumber
              ? el(
                'td',
                { class: 'positive' },
                `${this.accountTransactions[i].amount}`,
              )
              : el(
                'td',
                { class: 'negative' },
                `-${this.accountTransactions[i].amount}`,
              );
        const tableRowBody = el('tr');

        setChildren(tableRowBody, [
          el('td', `${this.accountTransactions[i].from}`),
          el('td', `${this.accountTransactions[i].to}`),
          normalAmount,
          el('td', `${normalDate}`),
        ]);
        container.append(tableRowBody);
      }
    }
  }

  createHistoryTranslation() {
    const containerDynamicsBalance = el('div', { class: 'history' });
    const table = el('table', { class: 'table' });
    const thead = el('thead');
    const tbody = el('tbody');
    const tableRowHead = el('tr');

    // Созание слайдера
    const historyWrapper = el('div', { class: 'history__wrapper flex' });
    const sliderWrapper = el('div', { class: 'history__slider flex' });
    const currentSlider = el('span', { class: 'history__current' }, '1');
    const maxSlider = el(
      'span',
      { class: 'history__max' },
      `${Math.ceil(this.accountTransactions.length / 10)}`,
    );

    const buttonSliderDown = el('button', { class: 'slider__btn slider__btn--down btn' });
    const buttonSliderUp = el('button', { class: 'slider__btn btn' });

    if (+maxSlider.textContent === 0) {
      currentSlider.textContent = '0'
    }

    buttonSliderDown.addEventListener('click', () => {
      if (+currentSlider.textContent > 1) {
        const countCurrent = --currentSlider.textContent;
        const count = this.accountTransactions.length - countCurrent * 10;
        tbody.textContent = '';
        this.switchTransactionList(count, tbody);
      }
    });

    buttonSliderUp.addEventListener('click', () => {
      if (+currentSlider.textContent < +maxSlider.textContent) {
        const countCurrent = ++currentSlider.textContent;
        const count = this.accountTransactions.length - countCurrent * 10;
        tbody.textContent = '';
        this.switchTransactionList(count, tbody);
      }
    });

    setChildren(containerDynamicsBalance, historyWrapper, table);
    setChildren(historyWrapper, [
      el(
        'h3',
        { class: 'history__title view__title title' },
        'История переводов',
      ),
      sliderWrapper,
    ]);
    setChildren(sliderWrapper, [
      buttonSliderDown,
      currentSlider,
      el('span', '/'),
      maxSlider,
      buttonSliderUp,
    ]);

    setChildren(table, [thead, tbody]);
    setChildren(thead, tableRowHead);
    setChildren(tableRowHead, [
      el('th', 'Счёт отправителя'),
      el('th', 'Счёт получателя'),
      el('th', 'Сумма'),
      el('th', 'Дата'),
    ]);
    this.switchTransactionList(this.count, tbody)

    return containerDynamicsBalance;
  }
}
