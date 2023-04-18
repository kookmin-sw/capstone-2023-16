import graphql from "babel-plugin-relay/macro";

const personaPaginationFragment = graphql`
      fragment personaPaginationFragment on Query
        @refetchable(queryName: "pagination_personaListGetQuery")
        @argumentDefinitions(
          first: {type: "Int", defaultValue: 6}
          after: {type: "String"}
        ) {
          getOwnPersonas(first: $first, after: $after, sortingOpt: {})
          @connection(key: "Edges_getOwnPersonas") {
            edges {
              node {
                id
                nickname
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
          }
        }
    `;

export default personaPaginationFragment;