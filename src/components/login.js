"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validation } from "@/app/api/services/user.service";
import { useDictionary } from "@/hooks";
// import { cookies } from "next/headers";

const setAuthentication = (token, rememberMe, userName) => {
  if (typeof window !== "undefined") {
    // localStorage.setItem("token", token);
    // let cookieStore = cookies();
    // cookieStore("token", token);
    let today = new Date();
    let expire = new Date();
    if (rememberMe) {
      expire.setTime(today.getTime() + 3600000 * 365 * 15);
      document.cookie =
        "token=" + token + ";path=/" + ";expires=" + expire.toUTCString();
      document.cookie =
        "userName=" + userName + ";path=/" + ";expires=" + expire.toUTCString();
    } else {
      document.cookie = "token=" + token + ";path=/";
      document.cookie = "userName=" + userName + ";path=/";
    }
  }
};

const Login = (props) => {
  const dict = useDictionary();
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  // const [checked, setChecked] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const query = useSearchParams();

  // const handleLogin = () => {
  //   validation({
  //     UserName: userName,
  //     Password: password,
  //   }).then(({ data }) => {
  //     console.log("login");

  //     if (data.validateUser !== "") {
  //       setAuthentication(data.validateUser, checked, userName);

  //       const prevLocation = window.history;
  //       console.log(prevLocation);

  //       // prevLocation ? router.push(prevLocation) : router.push("/Cartable");
  //       router.refresh();
  //     } else setErrMsg(dict.login.error.wronguserpass);
  //   });
  // };
  const handleLogin = (e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let userName = formData.get("userName");
    let password = formData.get("password");
    let checked = formData.get("checked");
    validation({
      UserName: userName,
      Password: password,
    }).then(({ data }) => {
      if (data.validateUser !== "") {
        setAuthentication(data.validateUser, checked, userName);

        let path = query.get("path");
        console.log(path);

        if (path) router.push(path);
        else router.push("dashboard/cartable");

        // prevLocation ? router.push(prevLocation) : router.push("/Cartable");
        // router.refresh();
      } else setErrMsg(dict.login.error.wronguserpass);
    });
  };
  return (
    // <div className="card w-5/12 bg-base-100 shadow-xl">
    //   <figure className="bg-slate-400 h-12">
    //     <h2>{dict.login.header}</h2>
    //   </figure>
    //   <div className="card-body w-full">
    //     {errMsg ? (
    //       <div role="alert" className="alert alert-error">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           className="stroke-current shrink-0 h-6 w-6"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    //           />
    //         </svg>
    //         <span>{errMsg}</span>
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //     <input
    //       type="text"
    //       placeholder={dict.login.username}
    //       className="input input-bordered w-full"
    //       value={userName}
    //       onChange={(e) => setUserName(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder={dict.login.password}
    //       className="input input-bordered w-full"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <div>
    //       {/* <div className="label cursor-pointer "> */}
    //       <input
    //         type="checkbox"
    //         className="checkbox"
    //         value={checked}
    //         onChange={(e) => setChecked(e.target.checked)}
    //       />
    //       <label className="label-text align-top">
    //         {dict.login.rememberme}
    //       </label>
    //       {/* </div> */}
    //     </div>
    //     <div className="card-actions w-full">
    //       <button
    //         // type="primary"
    //         onClick={handleLogin}
    //         style={{ width: "100%" }}
    //         className="btn btn-primary"
    //       >
    //         {dict.login.submit}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <form className="card w-5/12 bg-base-100 shadow-xl" onSubmit={handleLogin}>
      <figure className="bg-slate-400 h-12">
        <h2>{dict.login.header}</h2>
      </figure>
      <div className="card-body w-full">
        {errMsg ? (
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
        )}
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
          <button
            type="submit"
            style={{ width: "100%" }}
            className="btn btn-primary"
          >
            {dict.login.submit}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
