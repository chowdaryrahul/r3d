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
    },
    user_name: {
      type: String,
      required: false,
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

let item = {
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
};

let item2 = {
  title: "3d printed bowl",
  user_id: "nPanEW0TiATqiBFx22H7iQL9HCk2",
  user_name: "Shivani m",
  category: "Decor",
  tags: "object, decorative",
  description: "Patterned bowl",
  upload_date: "05-14-2022",
  license: "ISO",
  price: 40,
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
  multiple_images_of_obj: ["/bowl1.png", "/bowl2.jpeg", "/bowl3.jpeg"],
  totalLikes: 0,
  likeDetails: [],
};

let item3 = {
  title: "Patterned basket/bowl",
  user_id: "nPanEW0TiAT99BFx22H7iQL9HCk2",
  user_name: "aish m",
  category: "Decor",
  tags: "object, decorative",
  description: "home decor bowl to keep things",
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
  multiple_images_of_obj: ["/bowl1.jpeg"],
  totalLikes: 0,
  likeDetails: [],
};

try {
  const newItem = new Item(item);
  const createdItem = await newItem.save();
  console.log(createdItem);

  const newItem2 = new Item(item2);
  const createdItem2 = await newItem2.save();

  const newItem3 = new Item(item3);
  const createdItem3 = await newItem3.save();
} catch (e) {
  console.log("Seed failed due to duplicate entries in Items");
}

mongoose.connection.close();
