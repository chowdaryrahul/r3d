import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type Order {
    _id: ID
    item_ids: [String]
    address: address
    price_details: priceDetails
    estimated_delivery: String
    user_id: String
    payment_info: OrderPaymentInfo
  }

  type CardDate {
    month: Int
    year: Int
  }
  
  type OrderPaymentInfo {
    card_no: String
    cvv: Int
    exp_date: CardDate
  }

  
  type ItemIds {
    item_ids: ID
  }
  type priceDetails {
    total_price: Float
    tax: Float
    shipping_cost: Float
  }
  type address {
    apartment: String
    street: String
    city: String
    state: String
    country: String
    zipcode: String
  }
  type Query {
    getOrders: [Order]
    getOrder(_id: ID): Order
  }

  type Mutation {
    createOrder(
      item_ids: [String]
      estimated_delivery: String
      user_id: String
      cvv: Int
      month: Int
      year: Int
      street: String
      apartment: String
      city: String
      state: String
      country: String
      zipcode: String
      total_price: Float
      tax: Float
      shipping_cost: Float
    ): Order
  }
`;
export default typeDefs;
