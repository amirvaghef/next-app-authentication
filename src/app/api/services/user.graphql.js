import { gql } from "@apollo/client";

export const VALIDATE_USER = gql`
  query ValidateUser(
    $UserName: String!
    $Password: String!
    $Checked: Boolean!
  ) {
    validateUser(userName: $UserName, password: $Password, checked: $Checked)
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
