import { errorMessage } from '../../main';

export function validateLoginForm(input) {
  const textErrValidate = 'Логин или пароль меньше 6 символов';
  if (input.value.length < 6 && input.value.length > 0) {
    errorMessage.textContent = textErrValidate;
    return false;
  }

  return true;
}

export function validateEmptyInput(valueNumber, valueSum, errorForm = '') {
  if (valueSum.trim() === '' || valueNumber.trim() === '') {
    errorForm.textContent = 'Пустое значение';
    return false;
  }

  return true;
}

export function validateTransferFunds(obj, errorForm = '') {
  if (obj.error === 'Invalid account from') {
    errorForm.textContent =
      'Не указан адрес счёта списания, или этот счёт не принадлежит нам';
    return false;
  } else if (obj.error === 'Invalid account to') {
    errorForm.textContent =
      'Не указан счёт зачисления, или этого счёта не существует';
    return false;
  } else if (obj.error === 'Invalid amount') {
    errorForm.textContent = 'Не указана сумма перевода, или она отрицательная';
    return false;
  } else if (obj.error === 'Overdraft prevented') {
    errorForm.textContent =
      'Мы попытались перевести больше денег, чем доступно на счёте списания';
    return false;
  }

  return true;
}

export function validateNumberLength(inputNumber, errorForm = '') {
  if (inputNumber.value.trim().length !== 26) {
    errorForm.textContent = 'Длина счета должна быть 26 цифр';
    return false;
  }

  return true;
}

export function notFilled(input) {
  return input.value.trim() !== '' ? true : false;
}

export function notFilledSum(inputSum) {
  return inputSum.value.trim() !== '' && Number(inputSum.value) > 0
    ? true
    : false;
}
