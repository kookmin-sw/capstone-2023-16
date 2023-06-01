import {graphql} from 'babel-plugin-relay/macro';

export const paidContentQuery = graphql`
  query PaidContentQuery($id: GlobalID!) {
    getPost(postId: $id) {
      paidContent
      content
    }
  }
`;
