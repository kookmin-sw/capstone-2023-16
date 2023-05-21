import {graphql} from 'babel-plugin-relay/macro';

export const titleNauthorNtagsFilter = graphql`
  query titleNauthorNtagsFilterQuery(
    $id: GlobalID!
    $tags: [GlobalID!]!
    $title: String!
  ) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      authorFilter: {id: $id}
      tagsFilter: {tagIds: $tags}
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
