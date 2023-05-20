import graphql from "babel-plugin-relay/macro";

const postGetQuery = graphql`
  query postGetQuery($postId: GlobalID!) {
    getPost(postId: $postId) {
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

export default postGetQuery;