import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const cookieArr = headers.cookies; //decodeURIComponent(context.headers.cookies).split(";");
  const token = cookieArr?.find((item) => item.name === "token")?.value;

  // const token = cookieArr
  //   ?.find((item) => item?.includes("token"))
  //   ?.replace("token=", "")
  //   ?.trim();

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const tokenCookie = new ApolloLink((operation, forward) => {
  if (operation.operationName === "ValidateUser")
    return forward(operation).map((res) => {
      console.log("res", res);
      console.log(operation.getContext());

      let token = res.data.validateUser;
      let userName = operation.variables.UserName;
      let today = new Date();
      let expire = new Date();
      if (operation.variables.Checked) {
        expire.setTime(today.getTime() + 3600000 * 365 * 15);

        document.cookie =
          "token=" + token + ";path=/" + ";expires=" + expire.toUTCString();
        document.cookie =
          "userName=" +
          userName +
          ";path=/" +
          ";expires=" +
          expire.toUTCString();
      } else {
        document.cookie = "token=" + token + ";path=/";
        document.cookie = "userName=" + userName + ";path=/";
      }

      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: token ? token : "",
        },
      }));
      return res;
    });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authLink, httpLink]), //authLink.concat(tokenCookie).concat(checkCookie).concat(httpLink),
  cache: new InMemoryCache(),
  credentials: "include",
  request: (operation) => {
    operation.setContext({
      fetchOptions: {
        credentials: "include",
      },
      headers,
    });
  },
});

export default client;
