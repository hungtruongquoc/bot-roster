// https://docs.cypress.io/api/introduction/api.html

describe('My First Test', () => {
  beforeEach(() => {
    cy.clock();
    cy.visit('/');
  });
  it('Visits the app root url', () => {
    cy.contains('.v-toolbar__title', 'Bot Roster')
  });

  it('shows substitution list', () => {
    cy.get('.v-tabs__item:nth(1)').click();
  });

  it('shows detail of a bot', () => {
    cy.tick(2000);
    cy.get('tr:nth(2)').click();
    cy.tick(2000);
    cy.get('.v-datatable__expand-content').should('be.visible');
  });

  it('allows users to generate new roster', () => {
    cy.tick(2000);
    cy.get('button.info').click();
    cy.tick(2000);
    cy.get('h6').should('not.contain', 'Salary Pts: 0');
  });
})
