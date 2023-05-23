import graphql from "babel-plugin-relay/macro";

const postPaginationFragment = graphql`
      fragment postPaginationFragment on Query
        @refetchable(queryName: "pagination_postListGetQuery")
        @argumentDefinitions(
          first: {type: "Int", defaultValue: 20}
          after: {type: "String"}
          id: {type: "GlobalID!"}
        ) {
          getPublicPosts(first: $first, after: $after, sortingOpt: {}, authorFilter: {id: $id})
          @connection(key: "Edges_getPublicPosts") {
            edges {
              node {
                id
                contentPreview
                title
              }
            }
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
              startCursor
            }
          }
        }
    `;

export default postPaginationFragment;