import userTypeDef from "./Type.js";
import userQuery from "./Query.js";
import userMutation from "./Mutation.js";

const userSchema = `
${userTypeDef}
${userQuery}
${userMutation}
`;
export default userSchema;
