import {graphql} from 'babel-plugin-relay/macro';

export const titleFilter = graphql`
  query titleFilterQuery($title: String!) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
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
