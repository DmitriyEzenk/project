/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
describe('Authorization', () => {
  it('Test failed authorization', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');

    cy.get('#login').type('devel');
    cy.get('#error-login').should(
      'contain',
      'Логин или пароль меньше 6 символов',
    );

    cy.get('#password').type('skillbox');
    cy.get('.view-btn').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.view-btn').click();
    cy.get('#password').should('have.attr', 'type', 'password');

    cy.get('.form__btn').click();
    cy.get('#error-login').should('contain', 'Пользователь не найден');
  });

  it('Test authorization and Exit', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');

    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');

    cy.get('.view-btn').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.view-btn').click();
    cy.get('#password').should('have.attr', 'type', 'password');

    cy.get('.form__btn').click();

    cy.get(':nth-child(4) > .nav__link').should('be.visible').click();
    cy.get('.popUp__no').should('be.visible').click();
    cy.get(':nth-child(4) > .nav__link').should('be.visible').click();
    cy.get('.popUp__yes').should('be.visible').click();

    cy.url().should('include', '/index.html');
  });

  it('POST authorization', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();
    cy.request('POST', 'http://localhost:3000/login').then((res) => {
      expect(res).to.have.property('status', 200);
      cy.wrap(res).should('not.be.empty');
    });
  });
});
