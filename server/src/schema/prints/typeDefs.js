import { gql } from "apollo-server-core";

const typeDefs = gql`
  
  type Item {
    _id: ID!	
    title: String!
    likes: Int
    user_id: String
    user_name: String
    category: String
    tags: String
    description: String
    upload_date: String
    license: String
    price: Float
    print_settings: PrintSettings,
    comments: [String]
  }

  type Comments {
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
  }
  
  type Mutation {
    createItem(
      title: String
      likes: Int
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
      filament_material: String
    ): Item
  }

`;

export default typeDefs;
