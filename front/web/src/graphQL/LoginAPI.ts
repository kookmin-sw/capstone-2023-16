// GraphQl 
import graphql from 'babel-plugin-relay/macro'
import { useMutation } from 'react-relay';



export const loginPostMutation = graphql`
  mutation LoginAPILoginMutation($username: String!, $password: String!) {
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

class LoginAPI {
  static loginPost(): [any, any] {
    throw new Error('Method not implemented.');
  }
  public loginPost = () => {
    return () => useMutation(loginPostMutation);
  }
}

export default LoginAPI;