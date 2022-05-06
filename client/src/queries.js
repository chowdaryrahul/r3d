import { gql } from "@apollo/client";

const FETCH_ITEMS = gql`
  query {
    fetchItems {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const CREATE_ITEM = gql`
  mutation (
    $title: String
    $user_id: String
    $user_name: String
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
    $multiple_images_of_obj: [String]
  ) {
    createItem(
      title: $title
      user_id: $user_id
      user_name: $user_name
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
      multiple_images_of_obj: $multiple_images_of_obj
    ) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const FETCH_ITEM = gql`
  query ($_id: ID) {
    fetchItem(_id: $_id) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const ADD_COMMENT = gql`
  mutation ($_id: ID, $user_id: String, $user_name: String, $comt_text: String) {
    commentItem(
      _id: $_id
      user_id: $user_id
      user_name: $user_name
      comt_text: $comt_text
    ) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const REMOVE_COMMENT = gql`
  mutation ($_id: ID, $user_id: String, $user_name: String, $comt_text: String) {
    uncommentItem(
      _id: $_id
      user_id: $user_id
      user_name: $user_name
      comt_text: $comt_text
    ) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const LIKE_ITEM = gql`
  mutation ($_id: ID, $user_id: String, $user_name: String, $totalLikes: Int) {
    likeItem(
      _id: $_id
      user_id: $user_id
      user_name: $user_name
      totalLikes: $totalLikes
    ) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

const UNLIKE_ITEM = gql`
  mutation ($_id: ID, $user_id: String, $user_name: String, $totalLikes: Int) {
    unlikeItem(
      _id: $_id
      user_id: $user_id
      user_name: $user_name
      totalLikes: $totalLikes
    ) {
      _id
      title
      likeDetails {
        user_id
        user_name
        liked
      }
      totalLikes
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
      comments {
        user_id
        user_name
        comt_text
      }
      multiple_images_of_obj
    }
  }
`;

let exported = {
  FETCH_ITEMS,
  CREATE_ITEM,
  FETCH_ITEM,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LIKE_ITEM,
  UNLIKE_ITEM,
};

export default exported;
