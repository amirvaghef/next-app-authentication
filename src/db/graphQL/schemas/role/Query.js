const roleQuery = `
type Query {
    roles: [Role!]!
    role(id: ID!): Role
}
`;
export default roleQuery;
