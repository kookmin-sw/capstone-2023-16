import {graphql} from 'babel-plugin-relay/macro';

export const categoryFilterQuery = graphql`
  query categoryFilterQuery($category: GlobalID!) {
    getPublicPosts(sortingOpt: {sortBy: ID}, categoryFilter: {id: $category}) {
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
