import {graphql} from 'babel-plugin-relay/macro';

const getOwnPersonasQuery = graphql`
  query GetPersonaQuery {
    getOwnPersonas(sortingOpt: {direction: ASC}) {
      edges {
        node {
          id
          nickname
        }
      }
    }
  }
`;

export default getOwnPersonasQuery;