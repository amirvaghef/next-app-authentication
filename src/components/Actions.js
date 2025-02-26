"use server";

import { validation } from "@/app/api/services/user.service";
import { cookies } from "next/headers";

export const loginAction = async (formData) => {
  // e.preventDefault();
  // let formData = new FormData(e.currentTarget);
  let userName = formData.get("userName");
  let password = formData.get("password");
  let checked = formData.get("checked");
  console.log(userName, "", password, "", checked);

  validation(
    {
      UserName: userName,
      Password: password,
      Checked: checked ? true : false,
    },
    cookies().getAll()
  ).then(({ data, loading }) => {
    console.log("login", data);

    let today = new Date();
    let expire = new Date();
    if (checked) {
      expire.setTime(today.getTime() + 3600000 * 365 * 15);

      cookies().set("token", data.validateUser, {
        path: "/",
        expires: expire.toUTCString(),
      });
      // document.cookie =
      //   "token=" + token + ";path=/" + ";expires=" + expire.toUTCString();
      cookies().set("userName", userName, {
        path: "/",
        expires: expire.toUTCString(),
      });
      // document.cookie =
      //   "userName=" +
      //   userName +
      //   ";path=/" +
      //   ";expires=" +
      //   expire.toUTCString();
    } else {
      cookies().set("token", data.validateUser, { path: "/" });
      // document.cookie = "token=" + token + ";path=/";
      cookies().set("userName", userName, { path: "/" });
      // document.cookie = "userName=" + userName + ";path=/";
    }

    // if (data.validateUser !== "") {
    //   // setAuthentication(data.validateUser, checked, userName);

    //   let path = query.get("path");
    //   console.log(path);

    //   if (path) router.push(path);
    //   // else router.push("dashboard/cartable");

    //   // prevLocation ? router.push(prevLocation) : router.push("/Cartable");
    //   // router.refresh();
    // } else setErrMsg(dict.login.error.wronguserpass);
  });
};
