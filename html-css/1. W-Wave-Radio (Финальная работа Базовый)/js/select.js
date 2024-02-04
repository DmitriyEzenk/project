const defaultSelect = () => {
  const element = document.querySelector('.select');
  const choices = new Choices(element, {
    searchEnabled: false,
  });

  let ariaLabel = element.getAttribute('aria-label');
  element.closest('.choices').setAttribute('aria-label', ariaLabel);
};


defaultSelect();
