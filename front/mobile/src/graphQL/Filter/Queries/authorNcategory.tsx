import {graphql} from 'babel-plugin-relay/macro';

export const authorNcategoryFilter = graphql`
  query authorNcategoryFilterQuery($id: GlobalID!, $category: GlobalID!) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      authorFilter: {id: $id}
      categoryFilter: {id: $category}
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
