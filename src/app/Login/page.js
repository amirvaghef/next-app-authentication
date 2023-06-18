"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Space, Card, Input, Button, Alert, Checkbox } from "antd";
// import { useLazyQuery, gql, ApolloClient } from "@apollo/client";
import { validation } from "../services/user.service";

const Login = (props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();

  // const VALIDATE_USER = gql`
  //   query ValidateUser($UserName: String!, $Password: String!) {
  //     validateUser(userName: $UserName, password: $Password)
  //   }
  // `;

  // const [validateUser, { loading, error }] = useLazyQuery(VALIDATE_USER);
  // if (loading) console.log("Is loading...");
  // if (error) console.log(`Error ${error}`);

  const handleLogin = () => {
    // const { data } = await validateUser({
    //   variables: {
    //     UserName: userName,
    //     Password: password,
    //   },
    // });

    // if (data.validateUser) navigate("/Cartable");
    // else setErrMsg("نام کاربری یا رمز عبور اشتباه می باشد");

    validation({
      UserName: userName,
      Password: password,
    }).then(({ data }) => {
      if (data.validateUser !== "") {
        localStorage.setItem("token", data.validateUser);
        const today = new Date();
        var expire = new Date();
        if (!checked) expire.setTime(today.getTime() + 3600000 * 24 * 15);
        else expire.setTime(today.getTime() + 3600000 * 365 * 15);

        document.cookie =
          "userName=" +
          userName +
          ";path=/" +
          ";expires=" +
          expire.toUTCString();

        const prevLocation = window.history;
        prevLocation ? router.push(prevLocation) : router.push("/Cartable");
      } else setErrMsg("نام کاربری یا رمز عبور اشتباه می باشد");
    });

    // validateUser({
    //   variables: {
    //     UserName: userName,
    //     Password: password,
    //   },
    // }).then(({ data }) => {
    //   if (data.validateUser !== "") {
    //     const today = new Date();
    //     var expire = new Date();
    //     if (!checked) expire.setTime(today.getTime() + 3600000 * 24 * 15);
    //     else expire.setTime(today.getTime() + 3600000 * 365 * 15);

    //     document.cookie =
    //       "userName=" +
    //       userName +
    //       ";path=/" +
    //       ";expires=" +
    //       expire.toUTCString();
    //     navigate("/Cartable");
    //   } else setErrMsg("نام کاربری یا رمز عبور اشتباه می باشد");
    // });
  };
  return (
    <Card
      title="ورود کاربر"
      style={{ width: "50%", textAlign: "start" }}
      type="inner"
    >
      {errMsg ? <Alert message={errMsg} type="error" /> : <></>}
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          placeholder="نام کاربری"
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input.Password
          placeholder="رمز عبور"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Checkbox
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        >
          مرا به خاطر بسپار
        </Checkbox>
        <Button type="primary" onClick={handleLogin} style={{ width: "100%" }}>
          ورود
        </Button>
      </Space>
    </Card>
  );
};

export default Login;
