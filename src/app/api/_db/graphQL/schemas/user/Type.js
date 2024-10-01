const userTypeDef = ` 
input UserInput { 
    _id: ID!
    userName: String!
    password: String!
    name: String
    family: String
    email: String!
    role: RoleInput
}

type User { 
    _id: ID!
    userName: String!
    password: String!
    name: String
    family: String
    email: String!
    role: Role
}`;

export default userTypeDef;
