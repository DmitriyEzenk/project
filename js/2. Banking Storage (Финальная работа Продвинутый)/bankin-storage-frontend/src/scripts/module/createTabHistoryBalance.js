import { el, setChildren } from 'redom';
import { getAccountById } from './workApi';
import { Account } from '../Class/Account';
import { createCanvasGraph } from './createCanvasGraph';
import { getUrl, showContent } from '../../main';

export async function createTabHistoryBalance() {
  const containerHistoryBalance = document.querySelector('.history-balance');

  if (!containerHistoryBalance) {
    return;
  }

  const url = getUrl();
  const account = await getAccountById(url);
  const accountItem = new Account(await getAccountById(url));

  const backLink = document.querySelector('.history-balance__btn');
  backLink.href = `viewAccount.html?accountNumber=${url}`;

  // Создание контейнера динамики баланса для вкладки Просмотра счета
  const containerBody = document.querySelector('.history-balance__wrapper');
  const containerDynamicsBalance = el('div', { class: 'history-graphic box' });
  const containerTransactionRatio = el('div', {
    class: 'transaction-ratio box',
  });

  setChildren(containerBody, [
    accountItem.createInfoAccount(),
    createCanvasGraph(account, containerDynamicsBalance, 1100, 200),
    createCanvasGraph(account, containerTransactionRatio, 1100, 200, true),
    accountItem.createHistoryTranslation(),
  ]);

  showContent();
}
