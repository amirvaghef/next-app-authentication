import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import {} from "dotenv/config";
import jwt from "jsonwebtoken";
import models from "../_db/models/index.js";
import graphQLConfig from "../_db/graphQL/index.js";
import db from "../_db/mongoDB.js";

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error("توکن معتبر نمی باشد");
    }
  }
};

const whiteList = ["ValidateUser"];

const server = new ApolloServer({
  ...graphQLConfig,
  introspection: process.env.NODE_ENV !== "production",
});
const handler = startServerAndCreateNextHandler(server, {
  // path: "/api/graphql",
  context: async (req, res) => {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    // res.setHeader(
    //   "Access-Control-Allow-Origin",
    //   "https://studio.apollographql.com"
    // );
    // res.setHeader(
    //   "Access-Control-Allow-Headers",
    //   "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Access-Control-Allow-Headers"
    // );
    // res.setHeader(
    //   "Access-Control-Allow-Methods",
    //   "POST, GET, PUT, PATCH, DELETE, OPTIONS, HEAD"
    // );
    // if (req.method === "OPTIONS") {
    //   res.end();
    //   return false;
    // }
    console.log("route", req.headers);

    const user = getUser(req.headers.get("authorization"));

    // if (res.getHeaders()) {
    //   console.log("2", user, res.getHeaders());
    //   res.setHeader("authorization", "user");
    // }
    return { user, models, req, res };
  },
});

try {
  db.connect(process.env.DB_HOST_DEV);
  console.log("Connect Successfully");
} catch (error) {
  console.log(error.message);
}

console.log(`🚀  Server ready`);

export async function GET(request) {
  return handler(request);
}

export async function POST(request) {
  // const data = JSON.parse(await request.clone().text()).operationName;
  // console.log(data);
  return handler(request);
}
