import graphql from "babel-plugin-relay/macro";

const personaPaginationFragment = graphql`
      fragment personaPaginationFragment on Query
        @refetchable(queryName: "pagination_personaListGetQuery")
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

export default personaPaginationFragment;