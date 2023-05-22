import graphql from 'babel-plugin-relay/macro';

const registerMutation = graphql`
  mutation registerMutation($email: String!, $password: String!, $username: String!) {
    register(email: $email, password: $password, username: $username) {
      ... on User {
        username
      }
    }
  }
`;

export default registerMutation;