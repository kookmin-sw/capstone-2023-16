import graphql from 'babel-plugin-relay/macro';


const PersonasFragment = graphql`
  fragment PersonasFragmentPersonaList_getOwnPersonas on Query
    @refetchable(queryName: "PersonasGetQuery")
    @argumentDefinitions(
      first: {type: "Int", defaultValue: 10}
      after: {type: "String"}
    ) {
      getOwnPersonas(first: $first, after: $after, sortingOpt: {})
      @connection(key: "Edges_getOwnPersonas") {
        edges {
          node {
            id
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }
`;

export default PersonasFragment;