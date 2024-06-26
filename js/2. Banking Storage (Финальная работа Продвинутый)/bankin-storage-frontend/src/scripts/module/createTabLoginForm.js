import { el, setChildren } from 'redom';
import { postLogin } from './workApi';
import { setToken } from './token';

export function createLoginForm() {
  const containerLogin = document.querySelector('.login');

  // Если контейнер с классом login найден то создаем форму для регистрации пользователя
  // с помощью библиотеки redom
  if (!containerLogin) {
    return;
  }

  const form = el('form', { class: 'form flex', id: 'form' });
  // При отправке формы если токен возвращается, сохраняем состояние авторизованости в
  // локальное хранилище
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    error.textContent = '';

    const tokenResponce = await postLogin();

    if (tokenResponce) {
      setToken(tokenResponce);
      navigateWithLoader('account.html');
      // window.location.href = 'account.html';
    }
  });

  // Обертка для логина и пароля
  const loginWrapper = el('div', { class: 'flex' });
  const passwordWrapper = el('div', { class: 'flex' });

  //Обертка для кнопки "Войти" и параграф для отображения ошибки
  const bottomWrapper = el('div', { class: 'bottom__wrapper flex' });
  const error = el('p', { class: 'error__login', id: 'error-login' });
  const viewBtn = el('button', { class: 'view-btn btn' });
  const formBtn = el(
    'button',
    { class: 'form__btn btn', tabindex: '3' },
    'Войти',
  );

  // При клике пароль виден, при следующем скрывается
  viewBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const inputPassword = document.getElementById('password');
    this.classList.toggle('view-btn--focus');

    this.classList.contains('view-btn--focus')
      ? inputPassword.setAttribute('type', 'text')
      : inputPassword.setAttribute('type', 'password');
  });

  // formBtn.append(el('button', { class: 'spinner', id: 'spinner' }));

  setChildren(bottomWrapper, [formBtn, error]);
  setChildren(passwordWrapper, [
    el(
      'label',
      { for: 'password', class: 'form__label', tabindex: '-1' },
      'Пароль',
    ),
    viewBtn,
    el('input', {
      class: 'form__input',
      type: 'password',
      id: 'password',
      placeholder: 'Введите Пароль...',
      autocomplete: 'off',
      value: 'skillbox',
      tabindex: '2',
    }),
  ]);

  setChildren(loginWrapper, [
    el(
      'label',
      { for: 'login', class: 'form__label', tabindex: '-1' },
      'Логин',
    ),
    el('input', {
      class: 'form__input',
      type: 'text',
      id: 'login',
      placeholder: 'Введите Логин...',
      value: 'developer',
      tabindex: '1',
    }),
  ]);
  setChildren(form, [loginWrapper, passwordWrapper], bottomWrapper);
  setChildren(containerLogin, [
    el('h2', { class: 'login__title title' }, 'Вход в аккаунт'),
    form,
  ]);
}

// Функция для отображения спиннера
function showSpinner() {
  const formBtn = document.querySelector('.form__btn');
  formBtn.innerHTML = '';

  setChildren(formBtn, el('button', { class: 'spinner', id: 'spinner' }));
}

// Функция для изменения window.location с отображением спиннера
function navigateWithLoader(url) {
  showSpinner();
  return new Promise((resolve) => {
    setTimeout(() => {
      window.location.href = url;
      resolve();
    }, 1000); // Имитация задержки загрузки
  });
}
