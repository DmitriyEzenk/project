/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Load viewAccount', () => {
  it('Test Currency and get response', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(3) > .nav__link').should('contain', 'Валюта').click();
    cy.get('h2.currency__title').should('contain', 'Валютный обмен');

    cy.request('GET', 'http://localhost:3000/currencies').then((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.have.length(39);
    });

    cy.get('.autocompletion--from').click();
    cy.contains('button', 'EUR').click();
    cy.get('#from').should('have.value', 'EUR');

    cy.get('.exchange-input__wrapper > :nth-child(7)').click();
    cy.get('.autocompletion__list--open > :nth-child(3) > .btn').click();
    cy.get('#to').should('have.value', 'USD');
    cy.get('.exchange__submit').click();
    cy.get('.currency__error').should(
      'contain',
      'Поля не заполнены или сумма равно 0.00',
    );
    cy.get('#sum').type('123.31');
    cy.get('.exchange__submit').click();
  });
});
