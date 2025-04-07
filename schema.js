const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
    type Employee {
        id: ID
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        salary: Float!
        department: String     # ✅ Added
        photo: String          # ✅ Added
        created: String
        updatedat: String
    }

    type User {
        id: ID
        _id: ID
        username: String!
        email: String!
        password: String!
        created: String
        updatedat: String
    }

    type Message {
        message: String
        status: Boolean
        error: String
        token: String
        employee: Employee
        user: User
    }

    type Query {
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
        login(username: String!, password: String!): Message
    }

    type Mutation {
        addEmployee(
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!
            department: String     # ✅ Added
            photo: String          # ✅ Added
        ): Message

        updateEmployee(
            id: ID!
            first_name: String!
            last_name: String!
            email: String!
            gender: String!
            salary: Float!
            department: String     
            photo: String          
        ): Message

        deleteEmployee(id: String!): Message

        signup(username: String!, email: String!, password: String!): Message
    }
`;
