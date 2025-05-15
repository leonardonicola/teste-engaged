describe('CharacterDetailsPage', () => {
  beforeEach(() => {
    cy.fixture('character-detail').then((mockData) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'Character') {
          req.reply(mockData);
        }
      }).as('getCharacterDetails');
    });

    cy.visit('/#/personagem/1');
  });

  it('displays character details correctly', () => {
    cy.wait('@getCharacterDetails');

    cy.contains('Morty Smith').should('be.visible');
    cy.get('img')
      .should('have.attr', 'src', 'https://rickandmortyapi.com/api/character/avatar/2.jpeg')
      .should('have.attr', 'alt', 'Morty Smith');

    cy.contains('Human').should('be.visible');
    cy.contains('Male').should('be.visible');
    cy.contains('Alive').should('be.visible');

    cy.get('[data-testid="location"]').should('contain', 'Citadel of Ricks');
    cy.get('[data-testid="location-dimension"]').should('contain', 'Unknown');

    cy.get('[data-testid="origin"]').should('contain', 'Earth (C-137)');
    cy.get('[data-testid="origin-dimension"]').should('contain', 'Dimension C-137');

    cy.get('[data-testid="episodes"]').should('contain', 'S01E01, S01E02');
  });
});
