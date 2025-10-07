import userQuery from "./Query.js";
import userMutation from "./Mutation.js";

const userResolver = { Query: userQuery, Mutation: userMutation };

export default userResolver;
