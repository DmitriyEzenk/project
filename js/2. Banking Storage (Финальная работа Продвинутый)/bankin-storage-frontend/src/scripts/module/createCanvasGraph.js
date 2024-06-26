/* eslint-disable prettier/prettier */
import { el, setChildren } from 'redom';

export function createCanvasGraph(
  account,
  container,
  width,
  height,
  ratioBoolean = false,
) {
  const canvas = el('canvas', { id: 'canvas', width: width, height: height });
  setChildren(
    container,
    ratioBoolean
      ? el(
        'h3',
        { class: 'view__title title' },
        'Соотношение входящих исходящих транзакций',
      )
      : el('h3', { class: 'view__title title' }, 'Динамика баланса'),
    el('a', {
      href: `/historyBalance.html?accountNumber=${account.account}`,
      class: 'balance-dynamics__link',
    }),
    canvas,
  );

  // Работа с месяцами
  const balance = []; // Инициализируем массив для 12 месяцев
  const balanceRatioTo = []; // Инициализируем массив для 12 месяцев
  const balanceRatioFrom = []; // Инициализируем массив для 12 месяцев
  const transactions = account.transactions;

  for (let month = 0; month < 12; month++) {
    let sum = 0; // Сбрасываем сумму для нового месяца
    let sumTo = 0;
    let sumFrom = 0;

    for (let i = 0; i < transactions.length; i++) {
      const transactionDate = new Date(transactions[i].date);
      const dateMonth = transactionDate.getMonth();

      // && dateYear === new Date().getFullYear()
      if (month === dateMonth) {
        sum += transactions[i].amount;

        // Соотношение
        if (transactions[i].to === account.account) {
          sumTo += transactions[i].amount;
        } else if (transactions[i].from === account.account) {
          sumFrom += transactions[i].amount
        }
      }

    }

    balance[month] = sum; // Обновляем сумму за месяц в массиве
    balanceRatioTo[month] = sumTo;
    balanceRatioFrom[month] = sumFrom;
  }

  // Работа с canvas
  const ctx = canvas.getContext('2d');

  const canvasMaxHeight = canvas.height;
  const canvasWidth = width - 100;
  const canvasHeight = 160;

  ctx.font = '15px sans-serif';
  ctx.fillText(`${account.balance}`, canvasWidth + 10, 11);
  ctx.fillText(0, canvasWidth + 10, canvasHeight - 2);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(canvasWidth, 0);
  ctx.stroke(); //чтобы линия нарисовалась
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvasHeight);
  ctx.stroke(); //чтобы линия нарисовалась
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(0, canvasHeight);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.stroke(); //чтобы линия нарисовалась
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(canvasWidth, 0);
  ctx.lineTo(canvasWidth, canvasHeight);
  ctx.stroke(); //чтобы линия нарисовалась
  ctx.closePath();

  let months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];
  let barWidth = canvasWidth / months.length;
  let barGap = width / 2 === 550 ? 30 : 3;

  // Для проверки графика с соотношением
  // const balance = [8500000, 4200000, 1300000, 0, 8900000, 5300000, 2200000, 4500000, 7000000, 2200000, 4500000, 12000000]; // Инициализируем массив для 12 месяцев
  // const balanceRatioTo = [1200000, 2200000, 9700000, 5300000, 4500000, 2700000, 0, 5600000, 2700000, 4500000, 7700000, 500000]; // Инициализируем массив для 12 месяцев
  // const balanceRatioFrom = [1200000, 2200000, 700000, 2200000, 4500000, 2700000, 7600000, 4500000, 2700000,2700000, 2600000, 8600000]; // Инициализируем массив для 12 месяцев

  function drawingGraphics(barHeight, barHeightF, i, color) {
    ctx.fillStyle = '#FD4E5D';
    ctx.fillRect(
      i * barWidth + barGap / 2,
      canvasHeight - barHeightF,
      barWidth - barGap,
      barHeightF,
    );

    ctx.fillStyle = color;
    ctx.fillRect(
      i * barWidth + barGap / 2,
      canvasHeight - barHeight - barHeightF,
      barWidth - barGap,
      barHeight,
    );

    ctx.fillStyle = '#000';
    ctx.fillText(months[i], i * barWidth + barWidth / 3, canvasMaxHeight - 20);
  }

  // Строим график по месяцам
  for (let i = 0; i < months.length; i++) {
    if (ratioBoolean) {
      const barHeightTo = ((canvasHeight / 100) * balanceRatioTo[i]) / (account.balance / 100);
      const barHeightFrom = ((canvasHeight / 100) * balanceRatioFrom[i]) / (account.balance / 100);

      drawingGraphics(barHeightTo, barHeightFrom, i, '#76CA66')
    } else {
      const barHeight = ((canvasHeight / 100) * balance[i]) / (account.balance / 100);
      drawingGraphics(barHeight, 0, i, '#116ACC')
    }
  }

  return container;
}
