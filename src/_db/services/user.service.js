// import { data } from "autoprefixer";
import client from "./client";
import * as gql from "./user.graphql";

export const validation = async (data, cookies) =>
  client.query({
    query: gql.VALIDATE_USER,
    variables: data,
    context: {
      headers: {
        cookies: cookies,
      },
    },
  });

export const logoff = async (data) =>
  client.mutate({ mutation: gql.LOGOFF, variables: data });

export const register = async (data) =>
  client.mutate({ mutation: gql.REGISTER_USER, variables: data });
