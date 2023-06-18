import * as bcrypt from "bcrypt";
import {} from "dotenv/config";

const userMutation = {
  newUser: async (parent, args, { models: contextValue }) => {
    const salt = bcrypt.genSaltSync(+process.env.SALT_ROUND);
    const password = bcrypt.hashSync(args.user.password, salt);
    return await contextValue.User.create({
      userName: args.user.userName,
      password: password,
      name: args.user.name,
      family: args.user.family,
      email: args.user.email,
      role: args.user.role,
    });
  },
  updateUser: async (parent, args, { models: contextValue, user }) => {
    if (user) {
      const salt = bcrypt.genSaltSync(+process.env.SALT_ROUND);
      const password = bcrypt.hashSync(args.user.password, salt);
      return await contextValue.User.findOneAndUpdate(
        { _id: args.user._id },
        {
          $set: {
            userName: args.user.userName,
            password: password,
            name: args.user.name,
            family: args.user.family,
            email: args.user.email,
            role: args.user.role,
          },
        },
        { new: true }
      );
    } else throw new Error("کاربر مجاز نمی باشد");
  },
  deleteUser: async (parent, args, { models: contextValue, user }) => {
    if (user) {
      try {
        await contextValue.User.findOneAndDelete({ _id: args.id });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else throw new Error("کاربر مجاز نمی باشد");
  },
};

export default userMutation;
