import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({ uri: "/api/graphql" });

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem("token");
  const cookieArr = decodeURIComponent(document.cookie).split(";");
  const token = cookieArr
    ?.find((item) => item?.includes("token"))
    ?.replace("token=", "")
    ?.trim();
  return {
    headers: { ...headers, authorization: token ? token : "" },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
