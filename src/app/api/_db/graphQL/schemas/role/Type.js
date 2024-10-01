const roleTypeDef = `
input RoleInput {
    _id: ID!
    roleName: String!
    roleAccess: [String],
}

type Role {
    _id: ID!
    roleName: String!
    roleAccess: [String],
}`;

export default roleTypeDef;
