import { gql } from "apollo-server-core";

const typeDefs = gql`
  # Your schema will go here
  scalar Upload
  
  type User {
    _id: String
    user_name: String!
    email: String!
    password: String
    firstname: String
    lastname: String
    about_me: String
    profile_pic: String
    cart_items: [ItemIds]
    active_order_ids: [String]
  }

  type AddressOfUser {
    apartment: String!
    street: String!
    city: String!
    country: String!
    state: String!
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
    quantity: Int
  }

  type Query {
    getUsers: [User]
    fetchUser(_id: String): User
  }

  type Mutation {
    createUser(
      _id: String
      user_name: String
      password: String
      email: String
      profile_pic: String
      firstname: String
      lastname: String
      about_me: String
    ): User

    detailsUpload(file: Upload!, _id: String): User

    addToCart(
      _id: String
      user_name: String
      item_id: String
      quantity: Int
    ): User

    removeFromCart(
      _id: String
      user_name: String
      item_id: String
      quantity: Int
    ): User

    afterPlaceOrder(_id: String, orderId: String): User

    updateUser(
      _id: String
      firstname: String
      lastname: String
      about_me: String
    ): User
  }
`;

export default typeDefs;
