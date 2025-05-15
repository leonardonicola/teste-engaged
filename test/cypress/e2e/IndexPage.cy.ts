describe('CharacterListPage', () => {
  beforeEach(() => {
    cy.fixture('character-list').then((mockData) => {
      cy.intercept('POST', '**/graphql', (req) => {
        if (req.body.operationName === 'GetCharacters') {
          req.reply(mockData);
        }
      }).as('getCharacters');
    });

    cy.visit('/#/');
  });

  it('should render characters from mock correctly', () => {
    cy.wait('@getCharacters');

    cy.contains('Rick Sanchez').should('be.visible');
    cy.contains('Morty Smith').should('be.visible');

    cy.get('img')
      .first()
      .should('have.attr', 'src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');

    cy.get('.q-pagination').should('exist');
  });

  it('should search characters using input', () => {
    cy.get('input').type('Morty');
    cy.wait('@getCharacters');

    cy.contains('Morty Smith').should('be.visible');
  });

  it('should show no results message if list is empty', () => {
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.operationName === 'GetCharacters') {
        req.reply({
          data: {
            characters: {
              info: { pages: 0 },
              results: [],
            },
          },
        });
      }
    }).as('getEmptyCharacters');

    cy.visit('/#/');
    cy.wait('@getEmptyCharacters');

    cy.contains('Nenhum personagem foi encontrado!').should('be.visible');
  });

  it('should navigate to character details on click', () => {
    cy.wait('@getCharacters');
    cy.contains('Rick Sanchez').click();

    cy.url().should('include', '/personagem/1');
  });
});
