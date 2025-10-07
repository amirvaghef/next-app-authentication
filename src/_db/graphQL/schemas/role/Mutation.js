const roleMutation = `
type Mutation {
    newRole(role: RoleInput!): Role
    updateRole(role: RoleInput!): Role
    deleteRole(id: ID!): Boolean!
}
`;
export default roleMutation;
