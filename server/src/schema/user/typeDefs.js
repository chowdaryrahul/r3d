import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  type User {
    _id: ID!
    user_name: String!
    password: String!
    email: String!
    firstname: String!
    lastname: String!
    about_me: String
    address: [AddressOfUser]
    item_ids: [ItemIds]
    payment_info: [UserPaymentInfo]
    active_order_ids: [ItemIds]
    cart_items: [ItemIds]
  }

  type AddressOfUser {
    apartment: String!
    street: String!
    city: String!
    country: String!
    zipcode: Int!
  }

  type UserPaymentInfo {
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

  type Query {
    getUsers: [User]
  }

  type Mutation {
    createUser(
      user_name: String
      password: String
      email: String
      firstname: String
      lastname: String
      about_me: String
      apartment: String!
      street: String!
      city: String!
      country: String!
      zipcode: Int!
      card_no: String!
      cvv: Int!
      month: Int!
      year: Int!
      item_id: ID!
    ): User
  }
`;

export default typeDefs;
