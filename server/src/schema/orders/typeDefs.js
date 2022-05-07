import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type Order {
    _id: ID!
    image_id: ID!
    estimated_delivery: String
    user_id: ID!
    payment_info: [OrderPaymentInfo]
  }

  type OrderPaymentInfo {
    card_no: String!
    cvv: Int!
    exp_date: CardDate
  }

  type CardDate {
    month: Int!
    year: Int!
  }
  type Query {
    getOrders: [Order]
  }

  type Mutation {
    createOrder(
      image_id: ID!
      estimated_delivery: String
      user_id: ID!
      cvv: Int!
      month: Int!
      year: Int!
    ): Order
  }
`;
export default typeDefs;
