import jwt from "jsonwebtoken";
import {} from "dotenv/config";

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    try {
      // const token = localStorage.getItem("token");
      const cookieArr = decodeURIComponent(document.cookie).split(";");
      const cookieToken = cookieArr
        ?.find((item) => item?.includes("token"))
        ?.replace("token=", "")
        ?.trim();

      const cookieUser = cookieArr
        ?.find((item) => item?.includes("userName"))
        ?.replace("userName=", "")
        ?.trim();

      if (cookieToken) {
        const tokenUser = jwt.verify(
          cookieToken,
          process.env.NEXT_PUBLIC_JWT_SECRET
        ).userName;

        if (tokenUser && tokenUser === cookieUser) return true;
        else return false;
      } else return "";
    } catch (error) {
      console.log(error);
    }
  }
};

export const getAuthenticatedUser = () => {
  if (typeof window !== "undefined") {
    try {
      const cookieArr = decodeURIComponent(document.cookie).split(";");
      const cookieToken = cookieArr
        ?.find((item) => item?.includes("token"))
        ?.replace("token=", "")
        ?.trim();

      const cookieUser = cookieArr
        ?.find((item) => item?.includes("userName"))
        ?.replace("userName=", "")
        ?.trim();

      if (cookieToken) {
        const tokenUser = jwt.verify(
          cookieToken,
          process.env.NEXT_PUBLIC_JWT_SECRET
        ).userName;

        if (tokenUser && tokenUser === cookieUser) {
          return tokenUser;
        } else return "";
      } else return "";
    } catch (error) {
      console.log(error);
    }
  }
};
