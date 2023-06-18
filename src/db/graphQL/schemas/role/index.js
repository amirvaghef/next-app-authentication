import roleTypeDef from "./Type.js";
import roleQuery from "./Query.js";
import roleMutation from "./Mutation.js";

const roleSchema = `
${roleTypeDef}
${roleQuery}
${roleMutation}
`;

export default roleSchema;
