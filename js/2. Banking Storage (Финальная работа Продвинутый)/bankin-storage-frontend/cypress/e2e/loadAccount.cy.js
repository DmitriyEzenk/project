/* eslint-disable no-undef */
describe('Load Account', () => {
  it('Test load Account', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(1) > .article').should('be.visible');

    cy.get('.choices__inner > .choices__list > .choices__item').click();
    cy.get('#choices--account-item-choice-1').should('contain', 'По балансу');
    cy.get('#choices--account-item-choice-2').should('contain', 'По номеру');
    cy.get('#choices--account-item-choice-3').should(
      'contain',
      'По последней транзакции',
    );
  });

  it('Add new account', () => {
    cy.visit('http://localhost:4000/');
    cy.viewport(1920, 1080);
    cy.get('.login__title').should('contain', 'Вход в аккаунт');
    cy.get('#login').type('developer');
    cy.get('#password').type('skillbox');
    cy.get('.form__btn').click();

    cy.get(':nth-child(1) > .article').should('be.visible');

    cy.get('.article')
      .its('length')
      .then((initialLength) => {
        // Нажимаем на кнопку для создания нового счета
        cy.get('#account__new').click();

        // Проверяем, что после создания нового счета количество элементов увеличилось на один
        cy.get('.article').should('have.length', initialLength + 1);
      });
  });
});
