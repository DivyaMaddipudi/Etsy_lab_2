// src/controller/graphqlController.js

const expressGraphQL = require("express-graphql").graphqlHTTP;

// const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

// expressGraphQL({
//   schema: schema,
//   graphiql: true,
// });
// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    employee(id: Int!): Employee    
    employees: [Employee],
  }
  type Mutation {
      createEmployee(name: String!, department: String!): Employee,
      deleteEmployee(id: Int!): DeleteEmployeeResponse
  }
  input EmployeeInput {
      name: String!,
      department: String!
  }
  type DeleteEmployeeResponse {
    id: Int!
  }
  type Employee {
    id: Int!,
    name: String!,
    department: String!
  }
`);
