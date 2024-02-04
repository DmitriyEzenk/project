// Добавление клиента на сервер
async function serverAddClient(obj) {
  let response = await fetch('http://localhost:3000/api/clients', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: obj.name,
      surname: obj.surname,
      lastName: obj.lastname,
      contacts: obj.contacts
    })
  })

  let data = await response.json();
  return data;
}

// Получить клиента по id с сервера
async function serverGetClient(id) {
  let response = await fetch('http://localhost:3000/api/clients/' + id);
  const data = await response.json();
  
  return data;
}

async function serverGetClients() {
  let response = await fetch('http://localhost:3000/api/clients');
  const data = await response.json();
  
  return data;
}

// Изменить данные клиента на сервере
async function serverChangeClient(client, inputObj, contactLIst) {
  const response = await fetch('http://localhost:3000/api/clients/' + client.id, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      surname: inputObj.surnameChange.value,
      name: inputObj.nameChange.value,
      lastName: inputObj.lastnameChange.value,
      contacts: contactLIst
    })
  })

  const data = await response.json();      
  return data;
}

// Удалить клиента с сервера по id
async function serverDeleteClient(id) {
  let response = await fetch('http://localhost:3000/api/clients/' + id, {
    method: 'DELETE'
  });
}

// Анимация полей ввода Ф.И.О
function animationModalInput() {
  const nameInput = document.querySelectorAll('.input');
  
  nameInput.forEach(name => {
    name.addEventListener('input', () => {
      name.value = transformInputValue(name);
    });
  });
  
  nameInput.forEach(input => {
    const inputText = input.parentNode.querySelector('.input__text');
    input.value.trim() ? inputText.classList.add('active') : inputText.classList.remove('active');

    input.addEventListener('input', () => {
      input.value.trim() ? inputText.classList.add('active') : inputText.classList.remove('active');
    });
  });
}

// Получение изображений для элементов созданных динамически
function getSvg() {
  const cancelBtn = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clip-path="url(#clip0_224_6739)">
                          <path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
                          </g>
                        </svg>
                        `;

  const changeBtn = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.7" clip-path="url(#clip0_121_2280)">
                        <path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/>
                        </g>
                      </svg>
                      `;

  const deleteBtn = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
                    </svg> 
                    `;

  const phoneLink = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.7">
                      <circle cx="8" cy="8" r="8" fill="#9873FF"/>
                      <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
                      </g>
                    </svg>
                    `;

  const emailLink = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
                    </svg>
                    `;

  const vkLink = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.7">
                    <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
                    </g>
                  </svg>
                  `;

  const facebookLink = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.7">
                        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
                        </g>
                      </svg>
                      `;
        
  const arrowUp = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 6L2.705 6.705L5.5 3.915L5.5 10L6.5 10L6.5 3.915L9.29 6.71L10 6L6 2L2 6Z" fill="#9873FF"/>
                  </svg>
                  `;
  
  const arrowDown = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g opacity="0.7" clip-path="url(#clip0_121_2399)">
                      <path d="M10 6L9.295 5.295L6.5 8.085L6.5 2H5.5L5.5 8.085L2.71 5.29L2 6L6 10L10 6Z" fill="#9873FF"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_121_2399">
                      <rect width="12" height="12" fill="white"/>
                      </clipPath>
                      </defs>
                    </svg>  
                    `;
  
  return {
    cancelBtn,
    changeBtn,
    deleteBtn,
    phoneLink,
    emailLink,
    vkLink,
    facebookLink,
    arrowUp,
    arrowDown 
  };
}

// Добавление маски для полей ввода телефона
function tuneInputMask() {
  const inputsTel = document.querySelectorAll('input[type="tel"]');
  let inputMask = new Inputmask('+7 (999) 999-99-99');
  inputMask.mask(inputsTel);
}

// Добавление к указаному инпуту класс, атрибуты, placeholder при его создании
function tuneAddContactInput(type, select) {
  let input = document.createElement('input');

  input.classList.add('contact__input', 'input__validate');
  input.setAttribute('type', type);
  input.setAttribute('select', select);
  input.placeholder = 'Введите данные контакта';

  return input;
}

// Изменение поля ввода для указанного select
function tuneSelectOnchange(item, input, btn) {
  item.children[1].remove();
  item.append(input);
  item.append(btn);
  tuneInputMask();
}

// Нормализация теста в полях ввода Ф.И.О, убирая пробелы, с заглавной буквы, после строчные
function transformInputValue(nameInput) {
  nameInput = nameInput.value.trim();

  if(nameInput !== '' && nameInput !== undefined) {
    return nameInput[0].toUpperCase() + nameInput.slice(1).toLowerCase();
  } else {
    return '';
  }
}

// Изменение формата даты для вывода в таблицу
function conversionDate(date) {
  const time = new Date(date);

  const year = time.getFullYear();
  const month = (time.getMonth() < 9 ? `0${time.getMonth() + 1}` : `${time.getMonth() + 1}`);
  const day = time.getDate() < 10 ? `0${time.getDate()}` : `${time.getDate()}`;
  const hour = time.getHours();
  const minut = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()}`;

  const dateString = `${day}.${month}.${year} `;
  const timeString = `${hour}:${minut}`;

  return {
    dateString,
    timeString
  };
}

// Валидация формы на правильность ввода при сохранении
function validationForm(modal) {
  const inputArray = modal.querySelectorAll('.input__validate');
  const error = modal.querySelector('#client__error');
  const nameInput = modal.querySelectorAll('.input');
  const lastName = modal.querySelector('.input--lastname');
  const phoneInput = modal.querySelectorAll('input[type="tel"]');
  const emailInput = modal.querySelectorAll('input[type="email"]');
  const vkInput = modal.querySelectorAll('input[select="vk"]');
  const facebookInput = modal.querySelectorAll('input[select="facebook"]');

  let errorTextArray = [];

  let result = true;

  function createError() {
    if (errorTextArray.length > 0) {
      error.textContent = 'Ошибка: ' + errorTextArray.join(', ');
    }
  }

  function removeError() {
    error.textContent = '';
    let result = true;
    if (lastName.value.trim() !== '' && lastName.value.trim() === lastName.value.replace(/[^А-Яа-яЁё -]/g, '')) {
      lastName.classList.remove('error__border');
    }
  }
  
  inputArray.forEach(input => {
    removeError();
    if (input.value.trim() === '') {
      if (!errorTextArray.includes('запоните поля')) {
        errorTextArray.push('запоните поля');
      } 

      input.classList.add('error__border');
      result = false;
    } else {
      input.classList.remove('error__border');
    }
  });

  nameInput.forEach(name => {
    removeError();
    const NAME_REGEXP = /[^А-Яа-яЁё -]/g;

    if (name.value.trim() !== '' && name.value.trim() !== name.value.replace(/[^А-Яа-яЁё -]/g, '')) {
      name.classList.add('error__border');
      if (!errorTextArray.includes('в Ф.И.О содержатся цифры или английские символы')) {
        errorTextArray.push('в Ф.И.О содержатся цифры или английские символы');
      }
      result = false;
    }
  });

  phoneInput.forEach(phone => {
    removeError();

    const PHONE_REGEXP = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (phone.value.trim() !== '' && !PHONE_REGEXP.test(phone.value.trim())) {
      removeError();

      phone.classList.add('error__border');
      if (!errorTextArray.includes('номер телефона заполнен не верно')) {
        errorTextArray.push('номер телефона заполнен не верно');
      }

      result = false;
    }
  });

  emailInput.forEach(email => {
    removeError();

    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    if (email.value.trim() !== '' && !EMAIL_REGEXP.test(email.value.trim())) {
      removeError();
      email.classList.add('error__border');
      if (!errorTextArray.includes('email заполнен не верно')) {
        errorTextArray.push('email заполнен не верно');
      }

      result = false;
    }
  });

  vkInput.forEach(vk => {
    removeError();

    const URL_REGEXP = /^(https:\/\/)?(www.)?(?:vk\.com)\/(id(\d{9})|[a-zA-Z0-9_.]+)/;
    if (vk.value.trim() !== '' && !URL_REGEXP.test(vk.value.trim())) {
      removeError();
      vk.classList.add('error__border');
      if (!errorTextArray.includes('URL адрес Vk заполнен не верно')) {
        errorTextArray.push('URL адрес Vk заполнен не верно');
      }

      result = false;
    }
  });

  facebookInput.forEach(facebook => {
    removeError();

    const URL_REGEXP = /^(https:\/\/)?(www.)?(?:facebook\.com)\/(id(\d{9})|[a-zA-Z0-9_.]+)/;
    if (facebook.value.trim() !== '' && !URL_REGEXP.test(facebook.value.trim())) {
      removeError();
      facebook.classList.add('error__border');
      if (!errorTextArray.includes('URL адрес Facebook заполнен не верно')) {
        errorTextArray.push('URL адрес Facebook заполнен не верно');
      }

      result = false;
    }
  });

  if(result === false) {
    createError();
  }

  return result;
}

// Валидация контактов, количество до 10
function validContact(contactList, addContactBtn) {
  const contactArr = contactList.querySelectorAll('.flex-contact');

  if (contactArr.length >= 10) {
    addContactBtn.classList.add('contact__btn--none');
  } else {
    addContactBtn.classList.remove('contact__btn--none');
  }
}

// Создание select, поле ввода, кнопки удаление и добавление в элемент списка, логика при выборе select
function createAddContactItem(contactList, contactBtn, selectValue = 'phone') {
  const contactItem = document.createElement('li');
  contactItem.classList.add('flex-contact');

  const select = document.createElement('select');
  const inputDefault = tuneAddContactInput('tel', 'phone');

  const phone = document.createElement('option');
  const additionalPhone = document.createElement('option');
  const email = document.createElement('option');
  const vk = document.createElement('option');
  const facebook = document.createElement('option');

  phone.textContent = 'Телефон';
  additionalPhone.textContent = 'Доп. телефон';
  email.textContent = 'Email';
  vk.textContent = 'Vk';
  facebook.textContent = 'Facebook';
  
  phone.setAttribute('value', 'phone');
  additionalPhone.setAttribute('value', 'additionalPhone');
  email.setAttribute('value', 'email');
  vk.setAttribute('value', 'vk');
  facebook.setAttribute('value', 'facebook');

  const cancelBtn = document.createElement('button');
  cancelBtn.classList.add('cancel__btn', 'button');
  cancelBtn.innerHTML = getSvg().cancelBtn;
  cancelBtn.setAttribute('type', 'button');

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const changeModal = document.getElementById('modal__change-client');
    
    contactItem.remove();
    if (contactList.querySelectorAll('li').length === 0) {
      contactList.classList.add('list-contacts--reset');
      contactBtn.classList.remove('add-contact__btn-open');
    }

    validContact(contactList, contactBtn);
  });
  
  contactItem.append(select, inputDefault, cancelBtn);

  if (selectValue === 'phone') {
    select.append(phone, facebook, email, additionalPhone, vk);
  } else if (selectValue === 'additionalPhone') {
    select.append(additionalPhone, phone, facebook, email, vk);
  } else if (selectValue === 'email') {
    select.append(email, additionalPhone, phone, facebook, vk);
  } else if (selectValue === 'vk') {
    select.append(vk, email, additionalPhone, phone, facebook);
  } else if (selectValue === 'facebook') {
    select.append(facebook, vk, email, additionalPhone, phone);
  }

  const choices = new Choices(select, {
    searchEnabled: false,
    itemSelectText: "",
  });

  const inputPhone = tuneAddContactInput('tel', 'phone');
  const inputAdditionalPhone = tuneAddContactInput('tel', 'additionalPhone');
  const inputEmail = tuneAddContactInput('email', 'email');
  const inputVk = tuneAddContactInput('url', 'vk');
  const inputFacebook = tuneAddContactInput('url', 'facebook');

  function choiceSelect(select) {
    switch (select.value) {
      case 'phone': 
        tuneSelectOnchange(contactItem, inputPhone, cancelBtn);
        break;
      case 'additionalPhone': 
        tuneSelectOnchange(contactItem, inputAdditionalPhone, cancelBtn);
        break;
      case 'email': 
        tuneSelectOnchange(contactItem, inputEmail, cancelBtn);
        break;
      case 'vk': 
        tuneSelectOnchange(contactItem, inputVk, cancelBtn);
        break;
      case 'facebook': 
        tuneSelectOnchange(contactItem, inputFacebook, cancelBtn);
        break;
    }
  }

  choiceSelect(select);

  select.addEventListener('change', function() { 
    choiceSelect(select);
  });

  return contactItem;
}

// Создание формы контакт в виде списка элементов для нового клиента
function createAddContactForm(modal) {
  const addContactContainer = modal.querySelector('#add-contact');
  const addContactBtn = modal.querySelector('#add-contact__btn');
  const addContactList = document.createElement('ul');
  
  addContactBtn.addEventListener('click', () => {    
    addContactList.classList.add('add-contact__list');
    addContactList.classList.remove('list-contacts--reset');

    
    addContactList.append(createAddContactItem(addContactList, addContactBtn));
    addContactContainer.prepend(addContactList);
    addContactBtn.classList.add('add-contact__btn-open');
    
    validContact(addContactList, addContactBtn);
    tuneInputMask();
  });
}

// Создание формы контакт в виде списка элементов для изменение клиента
async function createChangeContactForm(modal, clientObj) {
  const addContactContainer = modal.querySelector('#add-contact');
  const addContactBtn = modal.querySelector('#add-contact__btn');
  const addContactList = document.createElement('ul');

  const client = await serverGetClient(clientObj.id);

  if (client.contacts.length !== 0) {
    addContactList.classList.add('add-contact__list');
    addContactList.classList.remove('list-contacts--reset');

    addContactBtn.classList.add('add-contact__btn-open');
  }

  function addContactFromCreatedClient(contact) {
    const contactInput = contactItem.querySelector('.contact__input');
    contactInput.value = contact.value;
    addContactList.append(contactItem);
  }

  client.contacts.forEach(contact => {
    if (contact.type === 'Телефон') {
      contactItem = createAddContactItem(addContactList, addContactBtn, 'phone');
      addContactFromCreatedClient(contact);
      
    } else if (contact.type === 'Доп. телефон') {
      contactItem = createAddContactItem(addContactList, addContactBtn, 'additionalPhone');
      addContactFromCreatedClient(contact);

    } else if (contact.type === 'Email') {
      contactItem = createAddContactItem(addContactList, addContactBtn, 'email');
      addContactFromCreatedClient(contact);

    } else if (contact.type === 'Vkontakte') {
      contactItem = createAddContactItem(addContactList, addContactBtn, 'vk');
      addContactFromCreatedClient(contact);

    } else if (contact.type === 'Facebook') {
      contactItem = createAddContactItem(addContactList, addContactBtn, 'facebook');
      addContactFromCreatedClient(contact);
    }
  });

  addContactContainer.prepend(addContactList);
  
  addContactBtn.addEventListener('click', () => {
    addContactList.classList.add('add-contact__list');
    addContactList.classList.remove('list-contacts--reset');

    
    addContactList.append(createAddContactItem(addContactList, addContactBtn));
    addContactBtn.classList.add('add-contact__btn-open');
    
    validContact(addContactList, addContactBtn);
    tuneInputMask();
  });
}

// Открытие и закрытие модального окна (Новый клиент)
function openCloseAddClientModal() {
  const addClientBtn = document.getElementById('add__client');
  const modalAddClient = document.getElementById('modal__add-client');
  const cancelBtn = document.getElementById('add-client__cancel-btn');
  const closeBtn = document.getElementById('add-client__close-btn');
  
  animationModalInput();
  createAddContactForm(modalAddClient);
  
  addClientBtn.addEventListener('click', () => {
    modalAddClient.classList.add('open--modal');
  });
  
  cancelBtn.addEventListener('click', () => {
    resetClientModal(modalAddClient);
  });

  closeBtn.addEventListener('click', () => {
    resetClientModal(modalAddClient);
  });

}

// Добавление в объект значение
function createClientObj(emptyObj, contactList) {
  const surname = document.getElementById('surname');
  const name = document.getElementById('name');
  const lastname = document.getElementById('lastname');

  emptyObj.id = Math.floor(Math.random() * (200000 - 100000) + 100000),
  emptyObj.surname = surname.value;
  emptyObj.name = name.value;
  emptyObj.lastname = lastname.value;
  emptyObj.contacts = contactList;

  return emptyObj;
}

// Создание массива объектов с данными контактов, с указание типа и значения
function createContactObj(modal, array) {
  const addContactList = modal.querySelector('.add-contact__list');

  if (addContactList !== null) {
    const addContactArray = addContactList.querySelectorAll('input');

    addContactArray.forEach(contact => {
      const contactObj = {};
      
      if (contact.getAttribute('select') === 'phone') {
          contactObj.type = 'Телефон',
          contactObj.value = `${contact.value}`;
      } else if (contact.getAttribute('select') === 'additionalPhone') {
          contactObj.type = 'Доп. телефон',
          contactObj.value = `${contact.value}`;
      } else if (contact.getAttribute('select') === 'email') {
          contactObj.type = 'Email',
          contactObj.value = `${contact.value}`;
      } else if (contact.getAttribute('select') === 'vk') {
          contactObj.type = 'Vkontakte',
          contactObj.value = `${contact.value}`;
      } else if (contact.getAttribute('select') === 'facebook') {
          contactObj.type = 'Facebook',
          contactObj.value = `${contact.value}`;
      }

      array.push(contactObj);
    });
  }

  return array
}

// Создание строки таблицы с занесением данных с объекта клиента
function createClientRow(obj) {
  const row = document.createElement('tr');
  const colOne = document.createElement('td');
  const colTwo = document.createElement('td');
  const colThree = document.createElement('td');
  const colFour = document.createElement('td');
  const colFive = document.createElement('td');
  const colSix = document.createElement('td');
  const spanCreateDate = document.createElement('span');
  const spanUpdateDate = document.createElement('span');

  colOne.classList.add('client__id');
  colTwo.classList.add('client__name');
  colThree.classList.add('client__create-date');
  colFour.classList.add('client__update-date');
  colFive.classList.add('client__contact');
  spanCreateDate.classList.add('date__span');
  spanUpdateDate.classList.add('date__span');

  const btnGroup = document.createElement('div');
  const btnChange = document.createElement('button');
  const btnDelete = document.createElement('button');

  btnGroup.classList.add('button__group', 'flex');
  btnChange.classList.add('change__btn', 'button', 'flex');
  btnDelete.classList.add('delete__btn', 'button', 'flex');
  
  btnGroup.append(btnChange);
  btnGroup.append(btnDelete);  

  btnChange.innerHTML = getSvg().changeBtn + 'Изменить';
  btnDelete.innerHTML = getSvg().deleteBtn + 'Удалить';

  btnChange.addEventListener('click', () => {
    callChangeModal(obj, row);
  })

  btnDelete.addEventListener('click', () => {
     callDeleteModal(obj, row);
  })

  const contactGroupLink = document.createElement('ul');
  contactGroupLink.classList.add('group-link', 'flex');
  
  obj.contacts.forEach(contact => {
    contactGroupLink.append(createListLink(contact));
  })  

  colOne.textContent = obj.id;
  colOne.setAttribute('scope', 'row');
  colTwo.textContent = `${obj.surname} ${obj.name} ${obj.lastName}`;
  colThree.textContent = conversionDate(obj.createdAt).dateString;
  colThree.append(spanCreateDate);
  spanCreateDate.textContent = conversionDate(obj.createdAt).timeString;
  colFour.textContent = conversionDate(obj.updatedAt).dateString;
  colFour.append(spanUpdateDate);
  spanUpdateDate.textContent = conversionDate(obj.updatedAt).timeString;
  colFive.append(contactGroupLink);
  colSix.append(btnGroup);

  row.append(colOne, colTwo, colThree, colFour, colFive, colSix);

  return row;
}

// Создание списка ссылок контактов взятых с объекта, создание tooltip 
function createListLink(contact) {
  const contactLinkItem = document.createElement('li');
  const contactLink = document.createElement('a');
  const spanContactLink = document.createElement('span');
  const spanTextLink = document.createElement('span');

  contactLinkItem.classList.add('group-link__item');
  contactLink.classList.add('link')
  spanContactLink.classList.add('toltip');
  spanTextLink.classList.add('toltip__link');
  
  if(contact.type === 'Телефон') {
    contactLink.innerHTML = getSvg().phoneLink;
    contactLink.setAttribute('id', 'phone__link');
    contactLink.setAttribute('value', `${contact.value}`);
    contactLink.setAttribute('href', `tel:+${contact.value.replace(/[^0-9]/g,"")}`);
    spanContactLink.textContent = 'Телефон: '

  } else if (contact.type === 'Доп. телефон') {
    contactLink.innerHTML = getSvg().phoneLink;
    contactLink.setAttribute('id', 'additional-phone__link');
    contactLink.setAttribute('value', `${contact.value}`);
    contactLink.setAttribute('href', `tel:+${contact.value.replace(/[^0-9]/g,"")}`);
    spanContactLink.textContent = 'Доп. телефон: ';

  } else if (contact.type === 'Email') {
    contactLink.innerHTML = getSvg().emailLink;
    contactLink.setAttribute('id', 'email__link');
    contactLink.setAttribute('value', `${contact.value}`);
    contactLink.setAttribute('href', `mailto: ${contact.value}`);
    contactLink.setAttribute('target', `_blank`);
    spanContactLink.textContent = 'Email: '

  } else if (contact.type === 'Vkontakte') {
    contactLink.innerHTML = getSvg().vkLink;
    contactLink.setAttribute('id', 'vkontakte__link');
    contactLink.setAttribute('value', `${contact.value}`);
    contactLink.setAttribute('href', `${contact.value}`);
    contactLink.setAttribute('target', `_blank`);
    spanContactLink.textContent = 'Vk: '

  } else if (contact.type === 'Facebook') {
    contactLink.innerHTML = getSvg().facebookLink;
    contactLink.setAttribute('id', 'facebook__link');
    contactLink.setAttribute('value', `${contact.value}`);
    contactLink.setAttribute('href', `${contact.value}`);
    contactLink.setAttribute('target', `_blank`);
    spanContactLink.textContent = 'Facebook: '
  }

  spanContactLink.append(spanTextLink);
  contactLink.append(spanContactLink);
  contactLinkItem.append(contactLink); 
  
  spanTextLink.textContent = spanContactLink.parentNode.getAttribute('value');

  return contactLinkItem;
}

// Вызов модального окна(Изменитть клиента) и изменение данных в таблице после валидации
async function callChangeModal(clientObj, row) {
  const changeModal = document.getElementById('modal__change-client');
  const spanId = document.querySelector('.change-client__id');
  const saveBtn = document.getElementById('change-client__save-btn');
  
  const colTwo = row.querySelector('.client__name');
  const colFour = row.querySelector('.client__update-date');
  const colFive = row.querySelector('.client__contact');
  
  const spanUpdateDate = document.createElement('span');
  spanUpdateDate.classList.add('date__span');

  const contactGroupLink = document.createElement('ul');
  contactGroupLink.classList.add('group-link', 'flex');

  let contactList = [];
  
  changeModal.classList.add('open--modal');
  spanId.textContent = `ID: ${clientObj.id}`;
  
  const client = await serverGetClient(clientObj.id);

  const surnameChange = document.getElementById('change-surname');
  const nameChange = document.getElementById('change-name');
  const lastnameChange = document.getElementById('change-lastname');  

  const inputObj = {
    surnameChange,
    nameChange,
    lastnameChange
  }
    
  surnameChange.value = client.surname;
  nameChange.value = client.name;
  lastnameChange.value = client.lastName;
  
  animationModalInput();
  createChangeContactForm(changeModal, client);
  
  const clickSaveBtn = async (e) => {
    e.preventDefault();

    if(validationForm(changeModal)){
      contactList = createContactObj(changeModal, contactList);

      const clientUpdate = await serverChangeClient(client, inputObj, contactList);
      
      colTwo.textContent = `${clientUpdate.surname} ${clientUpdate.name} ${clientUpdate.lastName}`;
      
      colFour.textContent = conversionDate(clientUpdate.updatedAt).dateString;
      colFour.append(spanUpdateDate);
      spanUpdateDate.textContent = conversionDate(clientUpdate.updatedAt).timeString;

      clientUpdate.contacts.forEach(contact => {
        contactGroupLink.append(createListLink(contact));
      })
      colFive.innerHTML = '';
      colFive.append(contactGroupLink);

      saveBtn.removeEventListener('click', clickSaveBtn);
      resetClientModal(changeModal);
    }
    
  }
  saveBtn.addEventListener('click', clickSaveBtn);

  closeChangeModal();
}

// Закрытие модального окна(Изменение клиента)
function closeChangeModal() {
  const changeModal = document.getElementById('modal__change-client');
  const cancelBtn = document.getElementById('change-client__cancel-btn');
  const closeBtn = document.getElementById('change-client__close-btn');

  cancelBtn.addEventListener('click', () => {
    resetClientModal(changeModal);
  });

  closeBtn.addEventListener('click', () => {
    resetClientModal(changeModal);
  })
}

// Вызов модального окна и удаление элемента
function callDeleteModal(obj, row) {
  const deleteModal = document.getElementById('modal-delete');
  const deleteBtn = document.getElementById('delete-button');
  const cancelBtn = document.getElementById('cancel--delete-modal');
  const closeBtn = document.getElementById('delete-modal__close-btn');

  deleteModal.classList.add('open--modal-delete');

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();

    row.remove();
    serverDeleteClient(obj.id);

    deleteModal.classList.remove('open--modal-delete');  
  });

  cancelBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteModal.classList.remove('open--modal-delete');  
  })

  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    deleteModal.classList.remove('open--modal-delete');  
  })
}

// Сброс занесеных данных в полях ввода для последующего открывания модального окна
function resetClientModal(modal) {
  modal.classList.remove('open--modal');

  const addContactList = modal.querySelector('.add-contact__list');
  const contactBtn = modal.querySelector('#add-contact__btn');

  if (addContactList !== null) {
    const contactList = addContactList.querySelectorAll('li');
    contactList.forEach(input => {
      input.remove();
    });

    addContactList.remove();
    contactBtn.classList.remove('add-contact__btn-open');
  }

  modalInput = modal.querySelectorAll('.input');

  modalInput.forEach(input => {
    const inputText = input.parentNode.querySelector('.input__text');
    inputText.classList.remove('active');

    input.classList.remove('error__border');

    input.value = '';
  });

  const error = modal.querySelector('#client__error');
  error.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', async () => {  
  const clientObj = {};
  let contactArray = [];
  const clientArray = [];
  let dir = false;
  
  const modalAddClient = document.getElementById('modal__add-client');
  const tbodyContainer = document.getElementById('tbody');
  openCloseAddClientModal();
  
  const clientItemList = await serverGetClients();
  
  clientItemList.forEach(clientItem => {
    const clientItemElement = createClientRow(clientItem);
    clientArray.push(clientItem);
    tbodyContainer.append(clientItemElement);
  })
  
  // Добавление новых клиентов в таблицу
  document.getElementById('add-client__save-btn').addEventListener('click', async (e) => {
    e.preventDefault();

    if(validationForm(modalAddClient)) {

      createClientObj(clientObj, createContactObj(modalAddClient, contactArray));

      const clientItem = await serverAddClient(clientObj);
      clientArray.push(clientItem);
      console.log(clientArray);
      const clientItemElement = createClientRow(clientItem);

      tbodyContainer.append(clientItemElement);

      resetClientModal(modalAddClient);
      contactArray = [];
    }

  });

  // Логика сортировки по колонкам
  async function sortClient(prop) {
    let result = clientArray.sort( function(a, b) {
      let dirIf = dir === false ? a[prop] < b[prop] : a[prop] > b[prop];

      if (dirIf === true) {
        return -1;
      };

    });

    dir = !dir;

    tbodyContainer.innerHTML = '';
    result.forEach(item => {
      tbodyContainer.append(createClientRow(item));
    });
  }

  // Сортировка колонок и добавление стрелок, а так же анимация цвета
  function sortClientCol(col, sortValue) {
    document.querySelector(col).addEventListener('click', () => {
      resetSortActive();
      sortClient(sortValue); 

      const colSpan = document.querySelector(col).querySelector('.col__span');
      if (col === '.col-two') {
        const colSpanName = document.querySelector(col).querySelector('.col__span--color');
        if(dir === false) {
          colSpanName.textContent = 'А - Я';
        } else {
          colSpanName.textContent = 'Я - А';
        }
      }

      if(dir === false) {
        colSpan.innerHTML = getSvg().arrowDown;
        document.querySelector(col).classList.add('col--active');
      } else {
        colSpan.innerHTML = getSvg().arrowUp;
        document.querySelector(col).classList.add('col--active');
      }
    });
  }
  
  // Сброс активной колонки, переключение сортировки
  function resetSortActive() {
    document.querySelectorAll('.col').forEach(col => {
      col.classList.remove('col--active');
      const colSpan = col.querySelector('.col__span');

      if (document.querySelector('.col-two').classList.contains('col--active')) {
        const colSpanName = document.querySelector('.col__span--color');
        colSpanName.textContent = '';
      }
      
      if(colSpan.innerHTML !== '') {
        colSpan.innerHTML = '';
      }
    })
  }
  
  // При нажатии на крестик таблицы сброс сортировки
  const tableReset = document.querySelector('.table__reset');
  tableReset.addEventListener('click', () => {
    resetSortActive();
    tbodyContainer.innerHTML = '';

    clientArray.forEach(clientItem => {
      const clientItemElement = createClientRow(clientItem);
      tbodyContainer.append(clientItemElement);
    })
  })
  
  sortClientCol('.col-one', 'id');
  sortClientCol('.col-two', 'surname');
  sortClientCol('.col-three', 'createdAt');
  sortClientCol('.col-four', 'updatedAt');

  // Фильтрация по строке
  async function filterHeaderInput () {
    const clearBtn = document.querySelector('.header__btn');
    const headerInput = document.querySelector('.header__input');

    clearBtn.addEventListener('click', () => {
      headerInput.value = '';
      tbodyContainer.innerHTML = '';

      clientArray.forEach(clientItem => {
        const clientItemElement = createClientRow(clientItem);
        tbodyContainer.append(clientItemElement);
    })
    })


    headerInput.addEventListener('input', () => {
      setTimeout(() => {
        let value = headerInput.value.trim().toLowerCase();
      
        if (value !== '') {
          tbodyContainer.innerHTML = '';

          clientArray.forEach((element) => {
            let elementStr = `${element.id} ${element.surname} ${element.name} ${element.lastName}`
            elementStr += ` ${conversionDate(element.createdAt).dateString} ${conversionDate(element.createdAt).timeString}`;
            elementStr += ` ${conversionDate(element.updatedAt).dateString} ${conversionDate(element.updatedAt).timeString}`;

            if (elementStr.toLowerCase().includes(value)) {
              tbodyContainer.append(createClientRow(element));
            }
          })
          } else {
            tbodyContainer.innerHTML = '';

            clientArray.forEach(clientItem => {
              const clientItemElement = createClientRow(clientItem);
              tbodyContainer.append(clientItemElement);
            })
        }
      }, 300);
    })
  }

  filterHeaderInput();
});