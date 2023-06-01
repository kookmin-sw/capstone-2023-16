import {graphql} from 'babel-plugin-relay/macro';

export const titleNauthorNcategoryFilter = graphql`
  query titleNauthorNcategoryFilterQuery(
    $id: GlobalID!
    $category: GlobalID!
    $title: String!
  ) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      authorFilter: {id: $id}
      categoryFilter: {id: $category}
      titleFilter: {token: $title, mode: CONTAINS}
    ) {
      edges {
        node {
          id
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
          title
          isPublic
          requiredMembershipTier
          bookmarkCnt
          commentCnt
          author {
            id
            nickname
          }
        }
      }
    }
  }
`;
