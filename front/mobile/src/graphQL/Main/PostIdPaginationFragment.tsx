import graphql from 'babel-plugin-relay/macro';

const PostIdPaginationFragment = graphql`
  fragment PostIdPaginationFragment on Query
  @refetchable(queryName: "pagination_PostIdListGetQuery")
  @argumentDefinitions(
    first: {type: "Int", defaultValue: 20}
    after: {type: "String"}
  ) {
    getPublicPosts(first: $first, after: $after, sortingOpt: {sortBy: ID})
      @connection(key: "Edges_getPublicPosts") {
      edges {
        node {
          id
          author {
            id
            nickname
          }
          contentPreview
          tags {
            edges {
              node {
                body
              }
            }
          }
          likeCnt
          paidContent
          bookmarkCnt
          requiredMembershipTier
          commentCnt
          title
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

export default PostIdPaginationFragment;
