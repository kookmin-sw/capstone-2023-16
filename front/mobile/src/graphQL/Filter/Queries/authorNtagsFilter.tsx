import {graphql} from 'babel-plugin-relay/macro';

export const authorNtagsFilter = graphql`
  query authorNtagsFilterQuery($id: GlobalID!, $tags: [GlobalID!]!) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      authorFilter: {id: $id}
      tagsFilter: {tagIds: $tags}
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
