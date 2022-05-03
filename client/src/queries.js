import { gql } from "@apollo/client";

const FETCH_ITEMS = gql`
  query {
    fetchItems {
      _id
      title
      likes
      user_id
      user_name
      category
      tags
      description
      upload_date
      license
      price
      print_settings {
        printer
        printer_brand
        rafts
        supports
        resolution
        infill
        filament_brand
        filament_color
        filament_material
      }
      comments
    }
  }
`;

const CREATE_ITEM = gql`
  mutation (
    $title: String
    $likes: Int
    $userId: String
    $userName: String
    $category: String
    $tags: String
    $description: String
    $uploadDate: String
    $license: String
    $price: Float
    $printer: String
    $printerBrand: String
    $rafts: String
    $supports: String
    $resolution: String
    $infill: String
    $filamentBrand: String
    $filamentColor: String
    $filamentMaterial: String
  ) {
    createItem(
      title: $title
      likes: $likes
      user_id: $userId
      user_name: $userName
      category: $category
      tags: $tags
      description: $description
      upload_date: $uploadDate
      license: $license
      price: $price
      printer: $printer
      printer_brand: $printerBrand
      rafts: $rafts
      supports: $supports
      resolution: $resolution
      infill: $infill
      filament_brand: $filamentBrand
      filament_color: $filamentColor
      filament_material: $filamentMaterial
    ) {
      _id
      title
      likes
      user_id
      user_name
      category
      tags
      description
      upload_date
      license
      price
      print_settings {
        printer
        printer_brand
        rafts
        supports
        resolution
        infill
        filament_brand
        filament_color
        filament_material
      }
    }
  }
`;

let exported = {
  FETCH_ITEMS,
  CREATE_ITEM,
};

export default exported;
