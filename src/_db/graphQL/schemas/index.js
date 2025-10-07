import userSchema from "./user/index.js";
import roleSchema from "./role/index.js";

const typeDefs = `#graphql
${userSchema}
${roleSchema}
`;

export default typeDefs;
