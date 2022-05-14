import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      username
      email
    }
  }
`;
