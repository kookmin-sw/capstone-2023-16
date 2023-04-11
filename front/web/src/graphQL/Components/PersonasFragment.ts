import graphql from 'babel-plugin-relay/macro';

const PersonasFragment = graphql`
fragment PersonasFragment on Query
  @argumentDefinitions(
    first: {type: "Int"}
    after: {type: "String"}
  )
  @refetchable(queryName: "GetOwnPersonasQuery") {
    getOwnPersonas(first: $first, after: $after, sortingOpt: {}) @connection(key: "Personas_getOwnPersonas") {
      edges {
        cursor
        node {
          nickname
          id
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      totalCount
    }
  }
`;

export default PersonasFragment;