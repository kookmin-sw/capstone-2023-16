import {graphql} from 'babel-plugin-relay/macro';

export const authorNtagsNcategoryFilter = graphql`
  query authorNtagsNcategoryFilterQuery(
    $id: GlobalID!
    $category: GlobalID!
    $tags: [GlobalID!]!
  ) {
    getPublicPosts(
      sortingOpt: {sortBy: ID}
      authorFilter: {id: $id}
      categoryFilter: {id: $category}
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
