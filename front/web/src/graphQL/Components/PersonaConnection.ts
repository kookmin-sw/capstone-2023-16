import graphql from 'babel-plugin-relay/macro';

const PersonaConnection = graphql`
  fragment PersonaConnection on PersonaConnection {
      edges {
        cursor
        node {
          nickname
          id
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      totalCount
    
  }
`;

export default PersonaConnection;