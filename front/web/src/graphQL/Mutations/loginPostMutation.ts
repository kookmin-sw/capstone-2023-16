import graphql from 'babel-plugin-relay/macro';

const loginPostMutation = graphql`
  mutation loginPostMutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ... on User {
        __typename
        id
        email
        createdAt
      }
    }
  }
`;

export default loginPostMutation;