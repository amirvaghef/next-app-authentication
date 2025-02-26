import Login from "@/components/login.js";

function index({ params }) {
  return <Login lang={params.lang} />;
}

export default index;
