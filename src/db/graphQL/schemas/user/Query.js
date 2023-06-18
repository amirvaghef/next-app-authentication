const userQuery = `
type Query{
    users: [User!]!
    user(id: ID!): User
    userByUserName(userName: String!): User
    validateUser(userName: String!, password: String!): String
}
`;
export default userQuery;
