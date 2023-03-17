import { gql } from '@apollo/client';

export const signup = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      __typename
      ... on User {
        id
        username
        email
        signupMethod
        createdAt
        updatedAt
      }
    }
  }
`

export const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      __typename
      ... on User {
        id
        username
        email
        signupMethod
        createdAt
        updatedAt
      }
    }
  }
`

export const logout = gql`
  mutation logout{
    logout
  }
`