import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type Order {
    _id: ID!
    item_ids: [ItemIds]
    address: [address]
    price_details: [priceDetails]
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
  type ItemIds {
    item_id: ID!
  }
  type priceDetails {
    total_price: String!
    tax: String!
    shipping_cost: String!
  }
  type address {
    apartment: String!
    street: String!
    city: String!
    country: String!
    zipcode: Int!
  }
  type Query {
    getOrders: [Order]
    getOrder(_id: ID): Order
  }

  type Mutation {
    createOrder(
      image_id: ID!
      estimated_delivery: String
      user_id: ID!
      cvv: Int!
      month: Int!
      year: Int!
      street: String!
      apartment: String!
      city: String!
      country: String!
      zipcode: Int!
      total_price: String!
      tax: String!
      shipping_cost: String!
    ): Order
  }
`;
export default typeDefs;
