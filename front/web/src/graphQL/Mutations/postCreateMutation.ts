import graphql from 'babel-plugin-relay/macro';

const postCreateMutation = graphql`
  mutation postCreateMutation($newPostInput: CreatePostInput!) {
    postCreate(newPostInput: $newPostInput) {
      ... on Post {
        id
        content
        createdAt
      }
    }
  }
`;

export default postCreateMutation;