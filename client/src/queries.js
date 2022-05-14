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
    $_id: String
    $userName: String
    $password: String
    $email: String
    $firstname: String
    $lastname: String
    $aboutMe: String
  ) {
    createUser(
      _id: $_id
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
      cart_items {
        item_id
        quantity
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation (
    $item_ids: [String]
    $cvv: Int
    $month: Int
    $year: Int
    $street: String
    $apartment: String
    $city: String
    $state: String
    $country: String
    $zipcode: String
    $estimated_delivery: String
    $user_id: String
    $total_price: Float
    $tax: Float
    $shipping_cost: Float
  ) {
    createOrder(
      item_ids: $item_ids
      cvv: $cvv
      month: $month
      year: $year
      street: $street
      apartment: $apartment
      city: $city
      state: $state
      country: $country
      zipcode: $zipcode
      estimated_delivery: $estimated_delivery
      user_id: $user_id
      total_price: $total_price
      tax: $tax
      shipping_cost: $shipping_cost
    ) {
      _id
      item_ids
      address {
        apartment
        street
        city
        state
        country
        zipcode
      }
      price_details {
        total_price
        tax
        shipping_cost
      }
      estimated_delivery
      user_id
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
const CREATE_ITEM = gql`
mutation Mutation($title: String, $user_id: String, $user_name: String, $category: String, $tags: String, $description: String, $license: String, $upload_date: String, $price: Float, $printer: String, $printer_brand: String, $rafts: String, $supports: String, $resolution: String, $infill: String, $filament_brand: String, $filament_color: String, $filament_material: String, $images: [String]) {
  createItem(title: $title, user_id: $user_id, user_name: $user_name, category: $category, tags: $tags, description: $description, license: $license, upload_date: $upload_date, price: $price, printer: $printer, printer_brand: $printer_brand, rafts: $rafts, supports: $supports, resolution: $resolution, infill: $infill, filament_brand: $filament_brand, filament_color: $filament_color, filament_material: $filament_material, multiple_images_of_obj: $images) {
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
    multiple_images_of_obj
  }
}

` 

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

const FETCH_USER = gql`
  query ($_id: String) {
    fetchUser(_id: $_id) {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      cart_items {
        item_id
        quantity
      }
    }
  }
`;

const GET_USERS = gql`
  query {
    getUsers {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      cart_items {
        item_id
        quantity
      }
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

const ADD_TO_CART = gql`
  mutation (
    $_id: String
    $user_name: String
    $item_id: String
    $quantity: Int
  ) {
    addToCart(
      _id: $_id
      user_name: $user_name
      item_id: $item_id
      quantity: $quantity
    ) {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      cart_items {
        item_id
        quantity
      }
      active_order_ids
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation (
    $_id: String
    $item_id: String
    $quantity: Int
    $user_name: String
  ) {
    removeFromCart(
      _id: $_id
      item_id: $item_id
      quantity: $quantity
      user_name: $user_name
    ) {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      cart_items {
        item_id
        quantity
      }
      active_order_ids
    }
  }
`;

const FETCH_MULTIPLE_ITEM_BY_ID = gql`
  query ($ids: [ID]) {
    fetchMultipleItemById(_ids: $ids) {
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

const UPDATE_ORDER_ID_IN_USER = gql`
  mutation ($_id: String, $orderId: String) {
    afterPlaceOrder(_id: $_id, orderId: $orderId) {
      _id
      user_name
      password
      email
      firstname
      lastname
      about_me
      cart_items {
        item_id
        quantity
      }
      active_order_ids
    }
  }
`;
const NOTIFICATION = gql`
subscription Subscription {
  newPostNotify
}
`;
const ALL_NOTIFICATIONS = gql`
query Notifications {
  notifications {
    user_name
  }
}
`;
let exported = {
  ALL_NOTIFICATIONS,
  NOTIFICATION,
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
  REMOVE_FROM_CART,
  ADD_TO_CART,
  FETCH_USER,
  GET_USERS,
  FETCH_MULTIPLE_ITEM_BY_ID,
  UPDATE_ORDER_ID_IN_USER,
};

export default exported;
