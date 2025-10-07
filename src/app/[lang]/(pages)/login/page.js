import Login from "@/components/login";

function login({params}) {
  return <Login lang={params.lang}/>;
}

export default login;
