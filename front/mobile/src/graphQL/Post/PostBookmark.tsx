import {graphql} from 'babel-plugin-relay/macro';

export const Post_bookmarkMutation = graphql`
  mutation PostBookmarkMutation($postId: GlobalID!) {
    postBookmarkToggle(postId: $postId)
  }
`;
