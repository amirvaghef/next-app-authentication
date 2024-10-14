const userMutation = `
type Mutation {
    newUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): Boolean!
    logoff(userName: String!): Boolean!
}
`;
export default userMutation;
