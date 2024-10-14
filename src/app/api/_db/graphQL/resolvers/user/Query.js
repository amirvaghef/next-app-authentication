import * as bcrypt from "bcrypt";
import {} from "dotenv/config";
import jwt from "jsonwebtoken";

const userQuery = {
  users: async (parent, args, { models: contextValue }) => {
    return await contextValue.User.find();
  },
  user: async (parent, args, { models: contextValue }) => {
    return await contextValue.User.findById(args._id);
  },
  userByUserName: async (parent, args, contextValue) => {
    return await contextValue.User.find({ userName: args.userName });
  },
  validateUser: async (parent, args, { models: contextValue }) => {
    try {
      // const salt = bcrypt.genSaltSync(+process.env.SALT_ROUND);
      // const password = bcrypt.hashSync(args.password, salt);
      const result = await contextValue.User.findOne({
        userName: args.userName,
      });

      console.log(
        "validate",
        result,
        result.get("isLogin"),
        result.isLogin,
        result.password
      );

      if (result) {
        if (bcrypt.compareSync(args.password, result.password)) {
          await contextValue.User.findOneAndUpdate(
            { userName: args.userName },
            {
              $set: {
                isLogin: true,
              },
            }
          );

          return jwt.sign(
            // result,
            {
              userName: result.userName,
              name: result.name,
              family: result.family,
              email: result.email,
              role: result.role,
            },
            process.env.JWT_SECRET
          );
        } else {
          console.log("wrong");
          return "";
        }
      } else {
        console.log("wrong no result");
        return "";
      }
    } catch (ex) {
      console.log("wrong exception", ex);
      return "";
    }
  },
};

export default userQuery;
