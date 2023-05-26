import graphql from 'babel-plugin-relay/macro';

const postDeleteMutation = graphql`
  mutation postDeleteMutation($postId: GlobalID!) {
    deletePost(postId: $postId)
  }
`;

export default postDeleteMutation;