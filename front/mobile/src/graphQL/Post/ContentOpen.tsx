import {graphql} from 'babel-plugin-relay/macro';

export const contentOpenQuery = graphql`
  query ContentOpenQuery($id: GlobalID!) {
    getPost(postId: $id) {
      content
    }
  }
`;
