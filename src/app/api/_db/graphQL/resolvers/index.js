import merge from "lodash";
import userResolver from "./user/index.js";
import roleResolver from "./role/index.js";

const resolvers = [roleResolver, userResolver];

export default resolvers;
