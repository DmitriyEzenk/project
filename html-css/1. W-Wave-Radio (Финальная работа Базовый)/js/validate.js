new JustValidate('.form', {
  colorWrong: '#D52B1E',

  rules: {
    textarea: {
      required: true,
    },
    name: {
      required: true,
      minLength: 2,
      maxLength: 35
    },
    mail: {
      required: true,
      email: true
    },
    check: {
      required: true,
    },
  },
  messages: {
    textarea: {
      required: 'Ошибка'
    },
    name: {
      required: 'Ошибка',
      minLength: 'Ошибка',
      maxLength: 'Ошибка'
    },
    email: {
      required: 'Ошибка',
      email: 'Ошибка'
    },
    check: {
      required: 'Ошибка'
    },
  },
});
