import { gql } from "@apollo/client";

export const VALIDATE_USER = gql`
  query ValidateUser($UserName: String!, $Password: String!) {
    validateUser(userName: $UserName, password: $Password)
  }
`;

export const LOGOFF = gql`
  mutation Logoff($UserName: String!) {
    logoff(userName: $UserName)
  }
`;

export const REGISTER_USER = gql`
  mutation NewUser($user: UserInput!) {
    newUser(user: $user) {
      _id
    }
  }
`;
