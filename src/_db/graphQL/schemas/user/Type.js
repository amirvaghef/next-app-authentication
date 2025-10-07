const userTypeDef = ` 
input UserInput { 
    _id: ID!
    userName: String!
    password: String!
    name: String
    family: String
    email: String!
    role: RoleInput
    isLogin: Boolean
}

type User { 
    _id: ID!
    userName: String!
    password: String!
    name: String
    family: String
    email: String!
    role: Role
    isLogin: Boolean
}`;

export default userTypeDef;
