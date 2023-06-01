import {graphql} from 'babel-plugin-relay/macro';

export const tagsFilter = graphql`
  query tagsFilterQuery($tags: [GlobalID!]!) {
    getPublicPosts(sortingOpt: {sortBy: ID}, tagsFilter: {tagIds: $tags}) {
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