import ActionButton from "./elements/button";
import { getDictionary } from "@/dictionaries";
import { loginAction } from "@/components/Actions";
// import { cookies } from "next/headers";

const Login = async ({lang}) => {
  const dict = await getDictionary(lang);
  

  // const [errMsg, setErrMsg] = useState("");
  // const router = useRouter();
  // const query = useSearchParams();

  return (
    <form className="card w-5/12 bg-base-100 shadow-xl" action={loginAction}>
      <figure className="bg-slate-400 h-12">
        <h2>{dict.login.header}</h2>
      </figure>
      <div className="card-body w-full">
        {/* {errMsg ? (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{errMsg}</span>
          </div>
        ) : (
          <></>
        )} */}
        <input
          type="text"
          placeholder={dict.login.username}
          className="input input-bordered w-full"
          name="userName"
        />
        <input
          type="password"
          placeholder={dict.login.password}
          className="input input-bordered w-full"
          name="password"
        />
        <div>
          {/* <div className="label cursor-pointer "> */}
          <input type="checkbox" className="checkbox" name="checked" />
          <label className="label-text align-top">
            {dict.login.rememberme}
          </label>
          {/* </div> */}
        </div>
        <div className="card-actions w-full">
          <ActionButton style={{ width: "100%" }} className="btn btn-primary">
            {dict.login.submit}
          </ActionButton>
        </div>
      </div>
    </form>
  );
};

export default Login;
