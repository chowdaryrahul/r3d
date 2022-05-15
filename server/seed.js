import MongoDBServerInit from "./src/servers/mongoServer";
import mongoose from "mongoose";

MongoDBServerInit();

const Schema = mongoose.Schema;

const Item = mongoose.model(
  "Item",

  new Schema({
    title: {
      type: String,
      required: true,
    },
    likeDetails: [
      {
        user_id: {
          type: String,
          required: false,
        },
        user_name: {
          type: String,
          required: false,
        },
        liked: {
          type: Boolean,
          required: false,
        },
      },
      { _id: false },
    ],
    totalLikes: {
      type: Number,
      required: false,
    },
    user_id: {
      type: String,
      required: false,
      unique: true,
    },
    user_name: {
      type: String,
      required: false,
      unique: true,
    },
    category: {
      type: String,
      required: false,
    },
    tags: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    upload_date: {
      type: String,
      required: false,
    },
    license: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    print_settings: {
      printer: {
        type: String,
        required: false,
      },
      printer_brand: {
        type: String,
        required: false,
      },
      rafts: {
        type: String,
        required: false,
      },
      supports: {
        type: String,
        required: false,
      },
      resolution: {
        type: String,
        required: false,
      },
      infill: {
        type: String,
        required: false,
      },
      filament_brand: {
        type: String,
        required: false,
      },
      filament_color: {
        type: String,
        required: false,
      },
      filament_material: {
        type: String,
        required: false,
      },
    },
    comments: [
      {
        user_id: {
          type: String,
          required: false,
        },
        user_name: {
          type: String,
          required: false,
        },
        comt_text: {
          type: String,
          required: false,
        },
      },
      { _id: false },
    ],
    multiple_images_of_obj: [
      {
        type: String,
        required: false,
      },
    ],
  })
);

let item = [
  {
    title: "Lamp",
    user_id: "nPanEW0TiATqiBFx22H7iQL9HCk2",
    user_name: "Shivani m",
    category: "Decor",
    tags: "object, decorative",
    description: "Patterned lamp",
    upload_date: "05-14-2022",
    license: "ISO",
    price: 29.99,
    print_settings: {
      printer: "Wireless 3D Printer",
      printer_brand: "MakerBot Replicator",
      rafts: "needed",
      supports: "needed",
      resolution: "10X10",
      infill: "Honeycomb",
      filament_brand: "Hatchbox PLA ",
      filament_color: "White",
      filament_material: "PLA Carbon Fiber",
    },
    comments: [],
    multiple_images_of_obj: ["/lamp1.jpeg", "/lamp2.jpeg"],
    totalLikes: 0,
    likeDetails: [],
  },
  {
    title: "3d printed bowl",
    user_id: "nPanEW0TiATqiBFx22H7iQL9HCk2",
    user_name: "Shivani m",
    category: "Decor",
    tags: "object, decorative",
    description: "Patterned bowl",
    upload_date: "05-14-2022",
    license: "ISO",
    price: 20,
    print_settings: {
      printer: "Wireless 3D Printer",
      printer_brand: "MakerBot Replicator",
      rafts: "needed",
      supports: "needed",
      resolution: "10X10",
      infill: "Honeycomb",
      filament_brand: "Hatchbox PLA ",
      filament_color: "White",
      filament_material: "PLA Carbon Fiber",
    },
    comments: [],
    multiple_images_of_obj: ["/bowl1.jpeg"],
    totalLikes: 0,
    likeDetails: [],
  },
  {
    title: "toy car",
    user_id: "nPanEW0TiATqiBFx22H7iQL9HCk2",
    user_name: "Shivani m",
    category: "Decor",
    tags: "object, decorative",
    description: "small toy car",
    upload_date: "05-14-2022",
    license: "ISO",
    price: 39,
    print_settings: {
      printer: "Wireless 3D Printer",
      printer_brand: "MakerBot Replicator",
      rafts: "needed",
      supports: "needed",
      resolution: "10X10",
      infill: "Honeycomb",
      filament_brand: "Hatchbox PLA ",
      filament_color: "White",
      filament_material: "PLA Carbon Fiber",
    },
    comments: [],
    multiple_images_of_obj: ["/toycar1.jpeg"],
    totalLikes: 0,
    likeDetails: [],
  },
  {
    title: "3D printed planter",
    user_id: "nPanEW0TiATqiBFx22H7iQL9HCk2",
    user_name: "Shivani m",
    category: "Decor",
    tags: "object, decorative",
    description: "beautiful patterned 3d printed tree planter",
    upload_date: "05-14-2022",
    license: "ISO",
    price: 45,
    print_settings: {
      printer: "Wireless 3D Printer",
      printer_brand: "MakerBot Replicator",
      rafts: "needed",
      supports: "needed",
      resolution: "10X10",
      infill: "Honeycomb",
      filament_brand: "Hatchbox PLA ",
      filament_color: "White",
      filament_material: "PLA Carbon Fiber",
    },
    comments: [],
    multiple_images_of_obj: ["/bowl1.png", "/bowl2.png", "/bowl3.jpeg"],
    totalLikes: 0,
    likeDetails: [],
  },
];

const User = mongoose.model(
  "User",

  new Schema({
    _id: String,
    user_name: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },
    about_me: {
      type: String,
      required: false,
    },
    cart_items: [
      {
        item_id: {
          type: String,
          required: false,
        },
        quantity: {
          type: Number,
          required: false,
        },
      },
    ],
    active_order_ids: [{ type: String, required: false }],
  })
);

let user = [
  {
    user_name: "Aish S",
    password: "123456",
    email: "aish@gmail.com",
    firstname: "Aish",
    lastname: "s",
    about_me: "",
    cart_items: [],
    active_order_ids: [],
    __v: 0,
  },
  {
    user_name: "Shivi M",
    password: "123456",
    email: "shiv@gmail.com",
    firstname: "Shivi",
    lastname: "M",
    about_me: "",
    cart_items: [],
    active_order_ids: [],
    __v: 0,
  },
  {
    user_name: "RahulC",
    password: "123456",
    email: "rc@gmail.com",
    firstname: "Rahul",
    lastname: "C",
    about_me: "",
    cart_items: [],
    active_order_ids: [],
    __v: 0,
  },
  {
    user_name: "TanayaB",
    password: "123456",
    email: "tanayab@gmail.com",
    firstname: "Tanaya",
    lastname: "B",
    about_me: "",
    cart_items: [],
    active_order_ids: [],
    __v: 0,
  },
  {
    user_name: "HarshitK",
    password: "123456",
    email: "harshitk@gmail.com",
    firstname: "Harshit",
    lastname: "K",
    about_me: "",
    cart_items: [],
    active_order_ids: [],
    __v: 0,
  },
];

const Order = mongoose.model(
  "Order",

  new Schema({
    user_id: {
      type: String,
      required: false,
    },
    item_ids: [
      {
        type: String,
        required: false,
      },
    ],
    estimated_delivery: {
      type: String,
      required: false,
    },
    payment_info: {
      card_no: {
        type: String,
        required: false,
      },
      cvv: {
        type: Number,
        required: false,
      },
      exp_date: {
        month: {
          type: Number,
          required: false,
        },
        year: {
          type: Number,
          required: false,
        },
      },
    },
    address: {
      apartment: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        reqired: false,
      },
      state: {
        type: String,
        reqired: false,
      },
      country: {
        type: String,
        required: false,
      },
      zipcode: {
        type: String,
        required: false,
      },
    },
    price_details: {
      total_price: {
        type: Number,
        required: false,
      },
      tax: {
        type: Number,
        required: false,
      },
      shipping_cost: {
        type: Number,
        required: false,
      },
    },
    firstname: {
      type: String,
      required: false,
    },
    lastname: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      reqired: false,
    },
    notes: {
      type: String,
      reqired: false,
    },
  })
);

let order = [
  {
    user_id: "FTob1le9D4U2bpDHfCyaYNykjS52",
    item_ids: ["6270b6ccce110939dbec8038"],
    estimated_delivery: "2022-05-22T02:54:53.939Z",
    payment_info: { cvv: 111, exp_date: { month: 11, year: 2022 } },
    address: {
      apartment: "2",
      street: "Css Street",
      city: "Jersey City",
      state: "New Jersey",
      country: "United States of America",
      zipcode: "07307",
    },
    price_details: { total_price: 44.1886, tax: 4.1986, shipping_cost: 10 },
    firstname: "Aishwarya",
    lastname: "Shirbhate",
    phone: "2012292446",
    notes: "Notes (Optional)",
    __v: 0,
  },
  {
    user_id: "FTob1le9D4U2bpDHfCyaYNykjS52",
    item_ids: ["6270b6ccce110939dbec8038"],
    estimated_delivery: "2022-05-22T02:54:53.939Z",
    payment_info: { cvv: 111, exp_date: { month: 11, year: 2022 } },
    address: {
      apartment: "1",
      street: "Css Street",
      city: "Jersey City",
      state: "New Jersey",
      country: "United States of America",
      zipcode: "07307",
    },
    price_details: { total_price: 44.1886, tax: 4.1986, shipping_cost: 10 },
    firstname: "Shivani",
    lastname: "M",
    phone: "2012292446",
    notes: "Notes (Optional)",
    __v: 0,
  },
];

const newItem = new Item(item);
try {
  const createdItem = await newItem.save();
  console.log(createdItem);
} catch (e) {
  console.log("Seed failed due to duplicate entries in Items");
}
const newUser = new User(user);
try {
  const createdUser = await newUser.save();
  console.log(createdUser);
} catch (e) {
  console.log("Seed failed due to duplicate entries in Users");
}
const newOrder = new Order(order);
try {
  const createdOrder = await newOrder.save();
  console.log(createdOrder);
} catch (e) {
  console.log("Seed failed due to duplicate entries in Orders");
}

mongoose.connection.close();
