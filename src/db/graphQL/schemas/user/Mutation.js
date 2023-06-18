const userMutation = `
type Mutation {
    newUser(user: UserInput!): User
    updateUser(user: UserInput!): User
    deleteUser(id: ID!): Boolean!
}
`;
export default userMutation;
