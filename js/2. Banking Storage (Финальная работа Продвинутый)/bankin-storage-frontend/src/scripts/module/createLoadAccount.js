/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import { createNewAccount, getAccounts } from './workApi';
import { Account } from '../Class/Account';
import { showContent } from '../../main';

let newArrAccounts = [];

//Загрузка существующих и создание нового счета
export async function loadAccounts() {
  const accountContainer = document.getElementById('account__list');
  const buttonNewAccount = document.getElementById('account__new');

  if (!accountContainer) {
    return;
  }

  // Загрузка существующих счетов
  const arrAccounts = await getAccounts();
  newArrAccounts = arrAccounts;

  for (const account of arrAccounts) {
    const existingAccount = new Account(account);
    existingAccount.createElement();
  }

  showContent();

  if (!buttonNewAccount) {
    return;
  }

  // Привязка события создания нового счета
  buttonNewAccount.addEventListener('click', async function () {
    const dataNewAccount = await createNewAccount();
    newArrAccounts.push(dataNewAccount);

    const newAccount = new Account(dataNewAccount);
    newAccount.createElement();
  });

  initSortAccount();
}

function initSortAccount() {
  const select = document.querySelector('.account__select');

  select.addEventListener('change', async function (e) {
    const accountList = document.querySelector('.account__list');
    accountList.innerHTML = '';
    let sortArray = [];

    switch (e.currentTarget.children[0].textContent) {
      case 'Сортировка':
        sortArray = newArrAccounts;
        break;
      case 'По балансу':
        sortArray = sort(newArrAccounts, function (objA, objB) {
          return objA.balance < objB.balance;
        });
        break;
      case 'По номеру':
        sortArray = sort(newArrAccounts, function (objA, objB) {
          return objA.account < objB.account;
        });
        break;
      case 'По последней транзакции':
        sortArray = sort(newArrAccounts, function (objA, objB) {
          if (
            objA.transactions.length === 0 &&
            objB.transactions.length === 0
          ) {
            return false;
          } else if (objA.transactions.length === 0) {
            return true;
          } else if (objB.transactions.length === 0) {
            return false;
          } else {
            return (
              new Date(objA.transactions[0].date) <
              new Date(objB.transactions[0].date)
            );
          }
        });
        break;
    }

    for (const account of sortArray) {
      const existingAccount = new Account(account);
      existingAccount.createElement();
    }
  });
}

function sort(arr, func) {
  let result = [...arr];
  for (let j = 0; j < arr.length; j++) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (func(result[i], result[i + 1])) {
        let temp = result[i];
        result[i] = result[i + 1];
        result[i + 1] = temp;
      }
    }
  }

  return result;
}
