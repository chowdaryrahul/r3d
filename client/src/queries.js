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

const GET_ORDER = gql`
  query ($id: ID) {
    getOrders {
      _id
      item_ids {
        item_id
      }
      estimated_delivery
      user_id
      price_details {
        total_price
        tax
        shipping_cost
      }
      address {
        apartment
        street
        city
        country
        zipcode
      }
      payment_info {
        card_no
        cvv
        exp_date {
          month
          year
        }
      }
    }
    getOrder(_id: $id) {
      _id
      item_ids {
        item_id
      }
      estimated_delivery
      user_id
      address {
        apartment
        street
        city
        country
        zipcode
      }
      price_details {
        total_price
        tax
        shipping_cost
      }
      payment_info {
        card_no
        cvv
        exp_date {
          month
          year
        }
      }
    }
  }
`;
const GET_ORDERS = gql`
  query Query {
    getOrders {
      _id
      item_id
      estimated_delivery
      user_id
      price_details {
        total_price
        tax
        shipping_cost
      }
      address {
        apartment
        street
        city
        country
        zipcode
      }
      payment_info {
        card_no
        cvv
        exp_date {
          month
          year
        }
      }
    }
  }
`;
const CREATE_USER = gql`
  mutation (
    $apartment: String!
    $street: String!
    $city: String!
    $country: String!
    $zipcode: Int!
    $cardNo: String!
    $cvv: Int!
    $month: Int!
    $year: Int!
    $itemId: ID!
    $userName: String
    $password: String
    $email: String
    $firstname: String
    $lastname: String
    $aboutMe: String
  ) {
    createUser(
      apartment: $apartment
      street: $street
      city: $city
      country: $country
      zipcode: $zipcode
      card_no: $cardNo
      cvv: $cvv
      month: $month
      year: $year
      item_id: $itemId
      user_name: $userName
      password: $password
      email: $email
      firstname: $firstname
      lastname: $lastname
      about_me: $aboutMe
    ) {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      address {
        apartment
        street
        city
        country
        zipcode
      }
      item_ids {
        item_id
      }
      payment_info {
        card_no
        cvv
        exp_date {
          month
          year
        }
      }
      active_order_ids {
        item_id
      }
      cart_items {
        item_id
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation Mutation(
    $imageId: ID!
    $userId: ID!
    $cvv: Int!
    $month: Int!
    $year: Int!
    $estimatedDelivery: String
  ) {
    createOrder(
      image_id: $imageId
      user_id: $userId
      cvv: $cvv
      month: $month
      year: $year
      estimated_delivery: $estimatedDelivery
      apartment: $apartment
      street: $street
      city: $city
      country: $country
      zipcode: $zipcode
    ) {
      _id
      item_ids {
        item_id
      }
      estimated_delivery
      user_id
      address {
        apartment
        street
        city
        country
        zipcode
      }
      payment_info {
        card_no
        cvv
        exp_date {
          month
          year
        }
      }
      price_details {
        total_price
        tax
        shipping_cost
      }
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
  mutation (
    $_id: ID
    $user_id: String
    $user_name: String
    $comt_text: String
  ) {
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
  mutation (
    $_id: ID
    $user_id: String
    $user_name: String
    $comt_text: String
  ) {
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
  GET_ORDER,
  GET_ORDERS,
  CREATE_USER,
  CREATE_ORDER,
  FETCH_ITEM,
  ADD_COMMENT,
  REMOVE_COMMENT,
  LIKE_ITEM,
  UNLIKE_ITEM,
};

export default exported;
