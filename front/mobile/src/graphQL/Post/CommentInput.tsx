import {graphql} from 'babel-plugin-relay/macro';

export const comments_inputMutation = graphql`
  mutation CommentInputMutation($body: String!, $postId: GlobalID!) {
    writeComment(body: $body, postId: $postId) {
      body
      createdAt
      id
    }
  }
`;
