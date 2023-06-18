import roleQuery from "./Query.js";
import roleMutation from "./Mutation.js";

const roleResolver = { Query: roleQuery, Mutation: roleMutation };

export default roleResolver;
