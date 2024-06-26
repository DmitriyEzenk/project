/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Load viewAccount', () => {
  it('Test Bank and get response', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(1) > .nav__link').should('contain', 'Банкоматы').click();
    cy.get('.common__title').should('contain', 'Карта банкоматов');

    cy.request('GET', 'http://localhost:3000/banks').then((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.have.length(1137);
    });
  });
});
