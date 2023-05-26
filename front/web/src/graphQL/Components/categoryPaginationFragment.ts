import graphql from "babel-plugin-relay/macro";

const categoryPaginationFragment = graphql`
      fragment categoryPaginationFragment on Query
        @refetchable(queryName: "pagination_categoryAllGetQuery")
        @argumentDefinitions(
          first: {type: "Int", defaultValue: 30}
          after: {type: "String"}
        ) {
          getAllCategories(first: $first, after: $after, sortingOpt: {})
          @connection(key: "Edges_getAllCategories") {
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

export default categoryPaginationFragment;