import graphql from 'babel-plugin-relay/macro';

const postFragment = graphql`
  fragment postFragment on Query
    @argumentDefinitions(
      postId: {type: "GlobalID!"}
    ){
      getPost(postId: $postId) {
        content
        title
        createdAt
      }
    }
`;

export default postFragment;