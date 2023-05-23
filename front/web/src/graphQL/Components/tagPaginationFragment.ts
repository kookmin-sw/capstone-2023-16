import graphql from "babel-plugin-relay/macro";

const tagPaginationFragment = graphql`
      fragment tagPaginationFragment on Query
        @refetchable(queryName: "pagination_tagAllGetQuery")
        @argumentDefinitions(
          first: {type: "Int", defaultValue: 20}
          after: {type: "String"}
        ) {
          getAllTags(first: $first, after: $after, sortingOpt: {})
          @connection(key: "Edges_getAllTags") {
            edges {
              node {
                id
                body
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

export default tagPaginationFragment;