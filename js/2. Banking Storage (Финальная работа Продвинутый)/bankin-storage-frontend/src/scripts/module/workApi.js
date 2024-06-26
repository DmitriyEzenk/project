/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { inputLogin, inputPassword, errorMessage } from '../../main.js';
import { getToken } from './token.js';

// Отправка авторизованого пользователя и получение токена
export async function postLogin() {
  try {
    const data = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: inputLogin.value,
        password: inputPassword.value,
      }),
    }).then((res) => res.json());

    // Если ответ пустой выкидываем ошибку
    if (data.payload === null) {
      throw new TypeError(data.error);
    }

    console.log(data.payload)

    return data.payload.token;
  } catch (error) {
    // Так как всегда приходит код статуса 200, ошибку обрабатываем исходя из сообщений
    if (error.message === 'No such user') {
      errorMessage.textContent = 'Пользователь не найден';
    } else if (error.message === 'Invalid password') {
      errorMessage.textContent = 'Пароль не верный';
    } else {
      errorMessage.textContent = 'Ошибка сервера. Попробуйте позже...';
    }
  }
}

// Получение координат маркеров для Яндекс карт
export async function getMapMarkers() {
  try {
    const response = await fetch('http://localhost:3000/banks');

    if (!response.ok) {
      throw new Error(`Ошибка сервер вернул код ${response.status}`);
    }

    const dataMarkers = await response.json();
    if (dataMarkers.code === '404') {
      throw new Error('Сервер не смог вернуть координаты');
    }

    if (!dataMarkers.payload || !Array.isArray(dataMarkers.payload)) {
      throw new Error('Неверный формат данных');
    }

    // Полученные данные обрабатываем в массив
    const arrСoordinates = dataMarkers.payload.map((item) => [
      item.lat,
      item.lon,
    ]);

    return arrСoordinates;
  } catch (error) {
    console.log(error.message);
    document.getElementById('map').style.backgroundColor = 'grey';
    return [];
  }
}

// Получение существующего счета
const token = getToken()

export async function getAccounts(keyToken) {
  try {
    const response = await fetch('http://localhost:3000/accounts', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Ошибка получения личного счета, сервер не доступен');
    }

    const data = await response.json();

    if (data.error === 'Unauthorized') {
      throw new Error('Ошибка получения личного счета, не был передан токен');
    }

    return data.payload;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

// Создание нового счета
export async function createNewAccount() {
  try {
    const data = await fetch('http://localhost:3000/create-account', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (data.error === 'Unauthorized') {
      throw new Error('Ошибка получения личного счета, не был передан токен');
    }

    return data.payload;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

// Получение счета по id (номеру счета)
export async function getAccountById(id) {
  try {
    const response = await fetch(`http://localhost:3000/account/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Ошибка получения личного счета, сервер не доступен');
    }

    const data = await response.json();

    if (data.error === 'Unauthorized') {
      throw new Error('Ошибка получения личного счета, не был передан токен');
    }

    return data.payload;
  } catch (error) {
    console.log('Error:', error.message);
    return null;
  }
}

export async function transferFunds(fromAccount, toAccount, sum) {
  try {
    const data = await fetch('http://localhost:3000/transfer-funds', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAccount.toString(), // счёт с которого списываются средства
        to: toAccount.toString(), // счёт, на который зачисляются средства
        amount: sum, // сумма для перевода
      }),
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.error('Ошибка перевода средств:', error);
    return { error: 'Ошибка перевода средств' };
  }
}

// Получение свои счета в Валютах
export async function getYourCurrency() {
  try {
    const data = await fetch('http://localhost:3000/currencies', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (!data.payload) {
      throw new Error(
        `Ошибка получения валютных счетов: ${data.error}`,
      );
    }

    return data.payload;
  } catch (error) {
    console.log(error.message);
  }
}

// Получение списка валют
export function getListCurrency() {
  try {
    const data = fetch('http://localhost:3000/all-currencies', {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    if (!data) {
      throw new Error(`Ошибка получения списка валют: ${data.error}`);
    }

    return data;

  } catch (error) {
    console.log(error.message);
  }
}

export async function transferFundsCurrency(fromCurrency, toCurrency, sum) {
  try {
    const data = await fetch('http://localhost:3000/currency-buy', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromCurrency.toString(), // счёт с которого списываются средства
        to: toCurrency.toString(), // счёт, на который зачисляются средства
        amount: sum, // сумма для перевода
      }),
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.error('Ошибка перевода средств:', error);
    return { error: 'Ошибка перевода средств' };
  }
}
