import graphql from "babel-plugin-relay/macro";

const postGetQuery = graphql`
  query postGetQuery($postId: GlobalID!) {
    getPost(postId: $postId) {
      content
      title
      createdAt
    }
  }
`;

export default postGetQuery;