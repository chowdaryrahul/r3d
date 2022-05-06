import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Item {
    _id: ID!
    title: String!
  }

  type Query {
    fetchItems: [Item]
  }
`;

export default typeDefs;
