import {graphql} from 'babel-plugin-relay/macro';

export const comments_getPostQuery = graphql`
  query CommentGetQuery($id: GlobalID!) {
    getPost(postId: $id) {
      comments {
        id
        body
        createdAt
        persona {
          nickname
          id
        }
      }
    }
  }
`;
