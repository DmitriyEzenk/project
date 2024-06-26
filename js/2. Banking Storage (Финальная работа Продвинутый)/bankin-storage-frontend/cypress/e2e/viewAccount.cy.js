/* eslint-disable no-undef */
describe('Load viewAccount', () => {
  it('Test viewAccount and back to loadAccount', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(1) > .article').should('be.visible');

    cy.get(':nth-child(1) > .article > .article__link')
      .should('contain', 'Открыть')
      .click();

    cy.url().should('include', '/viewAccount.html');

    cy.get('.view__top > .view__btn');

    // Проверка на отпраку перевода
    const accountFrom = '74213041477477406320783754';
    const accountTo = '47428361027202286036241184';
    cy.get('#number-account').type(`${accountTo}`);
    cy.get('#sum-account').type(123.56);
    cy.get('.new-translation__form > .view__btn').click();
    cy.get('tbody > :nth-child(1) > :nth-child(1)').should(
      'contain',
      `${accountFrom}`,
    );
    cy.get('tbody > :nth-child(1) > :nth-child(2)').should(
      'contain',
      `${accountTo}`,
    );

    // Проверка переключения истории
    cy.get('.history__slider > :nth-child(5)').click();
    cy.get('.history__current').should('contain', '2');
    cy.get('.slider__btn--down').click();
    cy.get('.history__current').should('contain', '1');

    // Проверка нажатия вернуться назад
    cy.get('.view__top > .view__btn')
      .should('contain', 'Вернуться назад')
      .click();
    cy.url().should('include', '/account.html');
  });
});
