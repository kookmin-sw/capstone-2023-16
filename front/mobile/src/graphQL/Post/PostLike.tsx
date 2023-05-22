import {graphql} from 'babel-plugin-relay/macro';

export const Post_likeMutation = graphql`
  mutation PostLikeMutation($postId: GlobalID!) {
    postLikeToggle(postId: $postId)
  }
`;
