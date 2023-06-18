"use client";

import { Form, Card, Space, Input, Button, Alert } from "antd";
import { useState } from "react";
// import { gql, useMutation } from "@apollo/client";
import { register } from "../services/user.service";

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

  // const [registerUser, { loading, error }] = useMutation(REGISTER_USER);
  // if (loading) console.log("Is loading...");
  // if (error) console.log(`Error ${error}`);

  const handleRegister = (e) => {
    console.log("register...");
    e.preventDefault();
    if (password === repPassword)
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
      }).then(({ data }) => {
        console.log(data);
        setSuccessMsg("ثبت نام با موفقیت انجام شد");
        setErrMsg("");
      });
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
      setErrMsg("رمز عبور و تکرار آن برابر نمی باشد");
      setSuccessMsg("");
    }
  };

  return (
    <Card title="ثبت کاربر" style={{ width: "50%" }} type="inner">
      <Form onSubmit={handleRegister} className="login-form">
        {errMsg ? <Alert message={errMsg} type="error" /> : <></>}
        {successMsg ? <Alert message={successMsg} type="success" /> : <></>}
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item>
            <Input
              placeholder="نام کاربری"
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              placeholder="رمز عبور"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input.Password
              placeholder="تکرار رمز عبور"
              onChange={(e) => setRepPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="نام"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="نام خانوادگی"
              onChange={(e) => setFamily(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="email"
              placeholder="ایمیل"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleRegister}
            style={{ width: "100%" }}
          >
            ثبت
          </Button>
        </Space>
      </Form>
    </Card>
  );
};

export default Register;
