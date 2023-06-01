import {graphql} from 'babel-plugin-relay/macro';

export const titleNcategoryFilter = graphql`
  query titleNcategoryFilterQuery($category: GlobalID!, $title: String!) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
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
