import client from "./client";
import * as gql from "./user.graphql";

export const validation = async (data) =>
  client.query({ query: gql.VALIDATE_USER, variables: data });

export const register = async (data) =>
  client.mutate({ mutation: gql.REGISTER_USER, variables: data });
