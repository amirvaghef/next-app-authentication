import * as bcrypt from "bcrypt";
import {} from "dotenv/config";
import jwt from "jsonwebtoken";

const userQuery = {
  users: async (parent, args, { models: contextValue }) => {
    return await contextValue.User.find();
  },
  user: async (parent, args, { models: contextValue }) => {
    return await contextValue.User.findById(args.id);
  },
  userByUserName: async (parent, args, contextValue) => {
    return await contextValue.User.find({ userName: args.userName });
  },
  validateUser: async (parent, args, { models: contextValue }) => {
    try {
      // const salt = bcrypt.genSaltSync(+process.env.SALT_ROUND);
      // const password = bcrypt.hashSync(args.password, salt);
      console.log("Validation1...");
      const result = await contextValue.User.findOne({
        userName: args.userName,
      });
      console.log("Validation2...");

      if (result) {
        if (bcrypt.compareSync(args.password, result.password)) {
          return jwt.sign(
            // result,
            {
              userName: result.userName,
              name: result.name,
              family: result.family,
              email: result.email,
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
