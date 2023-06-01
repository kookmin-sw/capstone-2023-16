import {graphql} from 'babel-plugin-relay/macro';

export const authorFilter = graphql`
  query authorFilterQuery($id: GlobalID!) {
    getPublicPosts(sortingOpt: {sortBy: ID}, authorFilter: {id: $id}) {
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