/* eslint-disable no-undef */
describe('Load viewAccount', () => {
  it('Test viewAccount and back to loadAccount', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(1) > .article > .article__link')
      .should('contain', 'Открыть')
      .click();

    cy.get('.view__top > .title').should('contain', 'Просмотр счёта');
    // При нажатии на график открывается История просмотров
    cy.get('.balance-dynamics__link').click();
    cy.get('.history-balance__top > .title').should(
      'contain',
      'История баланса',
    );

    // При нажатии на слайдер назад 0 не появляется
    cy.get('.slider__btn--down').click();
    cy.get('.history__current').should('contain', '1');

    // При нажатии на слайдер вперед значение увеличивается на 1
    cy.get('.history__slider > :nth-child(5)').click();
    cy.get('.history__current').should('contain', '2');

    // При нажатии кнопки вернуться назад возвращается на 1 страницу назад с просмотром счета
    cy.get('.history-balance__btn')
      .should('contain', 'Вернуться назад')
      .click();
    cy.url().should('include', '/viewAccount.html');
  });
});
