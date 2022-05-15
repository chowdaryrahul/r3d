import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Item {
    _id: ID!	
    title: String!
    likeDetails: [Likes]
    totalLikes: Int
    user_id: String
    user_name: String
    category: String
    tags: String
    description: String
    upload_date: String
    license: String
    price: Float
    print_settings: PrintSettings,
    comments: [Comments],
    multiple_images_of_obj: [String]
  }

  type Likes {
    user_id: String
    user_name: String
    liked: Boolean
  }

  type Comments {
    user_id: String
    user_name: String
    comt_text: String
  }

  type PrintSettings {
    printer: String
    printer_brand: String
    rafts: String
    supports: String
    resolution: String
    infill: String
    filament_brand: String
    filament_color: String
    filament_material: String
  }

  type Query {
    fetchItems: [Item]
    fetchItem(_id: ID): Item
    fetchMultipleItemById(_ids: [ID]): [Item]
    fetchMultipleItemByUserId(user_id: [ID]): [Item]
  }
  
  type Mutation {
    createItem(
      title: String
      user_id: String
      user_name: String
      category: String
      tags: String
      description: String
      upload_date: String
      license: String
      price: Float
      printer: String
      printer_brand: String
      rafts: String
      supports: String
      resolution: String
      infill: String
      filament_brand: String
      filament_color: String
      filament_material: String,
      multiple_images_of_obj: [String]
    ): Item

    likeItem(
      _id: ID
      user_id: String
      user_name: String
      totalLikes: Int
    ): Item

    unlikeItem(
      _id: ID
      user_id: String
      user_name: String
      totalLikes: Int
    ): Item

    commentItem(
      _id: ID
      user_id: String
      user_name: String
      comt_text: String
    ): Item

    uncommentItem(
      _id: ID
      user_id: String
      user_name: String
      comt_text: String
    ): Item
  }

`;

export default typeDefs;
