"use client";

import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
import { register } from "@/app/api/services/user.service";
import { useDictionary } from "@/hooks";

const Register = (props) => {
  //   const { getFieldDecorator } = props.form;
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repPassword, setRepPassword] = useState("");
  const [name, setName] = useState("");
  const [family, setFamily] = useState("");
  const [email, setEmail] = useState("");

  const dict = useDictionary();

  // const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  // if (loading) console.log("Is loading...");
  // if (error) console.log(`Error ${error}`);

  const handleRegister = (e) => {
    e.preventDefault();
      console.log("before success");
    if (password === repPassword){
      console.log("success");
      
      register({
        user: {
          _id: "",
          name,
          family,
          userName,
          password,
          email,
          role: null,
        },
      }).then(( data ) => {
        console.log(data);
        setSuccessMsg(dict.register.message.success);
        setErrMsg("");
      });
    }
    // registerUser({
    //   variables: {
    //     user: {
    //       _id: "",
    //       name,
    //       family,
    //       userName,
    //       password,
    //       email,
    //       role: null,
    //     },
    //   },
    // }).then(({ data }) => {
    //   console.log(data);
    //   setSuccessMsg("ثبت نام با موفقیت انجام شد");
    //   setErrMsg("");
    // });
    else {
      setErrMsg(dict.register.error.passrepassnotequal);
      setSuccessMsg("");
    }
  };

  return (
    <div className="card w-5/12 bg-base-100 shadow-xl">
      <figure className="bg-slate-400 h-12">
        <h2>{dict.register.header}</h2>
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
        {successMsg ? (
          <div role="alert" className="alert alert-success">
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
            <span>{successMsg}</span>
          </div>
        ) : (
          <></>
        )}
        <input
          type="text"
          placeholder={dict.register.username}
          className="input input-bordered w-full"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder={dict.register.password}
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder={dict.register.repassword}
          className="input input-bordered w-full"
          value={repPassword}
          onChange={(e) => setRepPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder={dict.register.name}
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder={dict.register.family}
          className="input input-bordered w-full"
          value={family}
          onChange={(e) => setFamily(e.target.value)}
        />
        <input
          type="email"
          placeholder={dict.register.email}
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="card-actions w-full">
          <button
            // type="primary"
            onClick={handleRegister}
            style={{ width: "100%" }}
            className="btn btn-primary"
          >
            {dict.register.submit}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
