import { graphql } from 'src/gql';

export const getCharacters = graphql(/* GraphQL */ `
  query GetCharacters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
      }
    }
  }
`);

export const getCharacterDetails = graphql(/* GraphQL */ `
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      gender
      origin {
        name
        dimension
      }
      episode {
        episode
      }
      location {
        name
        dimension
      }
    }
  }
`);
