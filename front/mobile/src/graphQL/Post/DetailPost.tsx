import {graphql} from 'babel-plugin-relay/macro';

export const detail_getPostQuery = graphql`
  query DetailPostQuery($id: GlobalID!) {
    getPost(postId: $id) {
      id
      content
      contentPreview
      createdAt
      likeCnt
      paidContent
      bookmarkCnt
      requiredMembershipTier
      title
      tags {
        edges {
          node {
            body
          }
        }
      }
      category {
        body
      }
      author {
        nickname
        id
      }
      commentCnt
      comments {
        id
        body
        createdAt
        persona {
          id
          nickname
        }
      }
    }
  }
`;
