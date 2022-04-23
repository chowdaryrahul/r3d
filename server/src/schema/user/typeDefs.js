import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type User {
    name: String!
  }

  type Query {
    user(name: String!): User
  }
`;

export default typeDefs;
