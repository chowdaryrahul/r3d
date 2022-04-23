import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type Item {
    _id: ID!
    title: String!
  }

  type Query {
    fetchItems: [Item]
  }
`;

export default typeDefs;
