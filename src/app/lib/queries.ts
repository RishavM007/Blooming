// app/queries.ts
import { gql } from '@apollo/client';

// Sign Up Mutation
export const SIGN_UP = gql`
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!,$phone: String!) {
    registerUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
        phone: $phone
      }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

// Sign In Mutation
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;
