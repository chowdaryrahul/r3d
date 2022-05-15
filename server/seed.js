import MongoDBServerInit from "./src/servers/mongoServer";
import mongoose from "mongoose";
import {
  randUser,
  randImg,
  randLine,
  randNumber,
  randBetweenDate,
  randAccessory,
  randProductCategory,
  randProductDescription,
} from "@ngneat/falso";
import { ObjectId } from "mongodb";

await MongoDBServerInit();

const users = [
  {
    username: "test",
    email: "test@gmail.com",
    uid: "qiD0TSDCfSScDKpu2PjHjxq5fw12",
  },
  {
    username: "Mark",
    email: "mark@stevens.com",
    uid: "Ociy644s9mYf2dv7y5VWLO2kHeU2",
  },
  {
    username: "test",
    email: "test@stevens.edu",
    uid: "Vjxfc6t73PX8TGCaivEieYDE1Kd2",
  },
  {
    username: "harshit",
    email: "test@gmail.com",
    uid: "5bSpVLO7NwYP82vSgjZiPl9m9pV2",
  },
  {
    username: "rahul",
    email: "hkaregti@gmail.com",
    uid: "wxZhhK6hLsZXYHA4ePzspjPvL2I2",
  },
  {
    username: "shivani",
    email: "shivani@gmail.com",
    uid: "nPanEW0TiATqiBFx22H7iQL9HCk2",
  },
  {
    username: "aishwarya",
    email: "aish@gmail.com",
    uid: "FTob1le9D4U2bpDHfCyaYNykjS52",
  },
  {
    username: "shivani",
    email: "shivani@stevens.edu",
    uid: "nJEZRbajutcgg0T0gOO9tiSInA72",
  },
  {
    username: "tanaya",
    email: "bholetanaya2715@gmail.com",
    uid: "OXe8OvF1Sngd69iETD2G0ad0jdf1",
  },
];

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
          unique: false,
          required: false,
        },
        user_name: {
          type: String,
          unique: false,
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

const User = mongoose.model(
  "User",

  new Schema({
    _id: String,
    user_name: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: false,
    },

    email: {
      type: String,
      required: true,
    },

    firstname: {
      type: String,
      required: false,
    },

    lastname: {
      type: String,
      required: false,
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

async function seedDB() {
  try {
    console.log("Seeding..");

    // make a bunch of users
    let userData = [];
    users.forEach((user) => {
      const randomUser = randUser();

      let newUser = {
        _id: user.uid,
        user_name: randomUser.username,
        email: user.email,
        firstname: randomUser.firstName,
        lastname: randomUser.lastName,
        about_me: randLine({ lineCount: 6 }),
        cart_items: [],
        active_order_ids: [],
        __v: 0,
      };

      userData.push(newUser);
    });

    User.collection.insertMany(userData, function (err, docs) {
      if (err) {
        return console.error(err);
      } else {
        console.log("Multiple users inserted to Collection");
      }
    });

    // make a bunch of items for each user
    userData.forEach((user) => {
      let itemData = [];
      for (let i = 0; i < 20; i++) {
        let newItem = {
          title: randAccessory(),
          user_id: user._id,
          user_name: user.user_name,
          category: "machine",
          tags: `${randProductCategory()},${randProductCategory()},${randProductCategory()},${randProductCategory()}`,
          description: randProductDescription(),
          upload_date: randBetweenDate({
            from: new Date("10/07/2020"),
            to: new Date(),
          }),
          license: "MIT",
          price: randNumber(),
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
          multiple_images_of_obj: [randImg(), randImg(), randImg(), randImg()],
          totalLikes: 0,
          likeDetails: [],
        };
        itemData.push(newItem);
      }
      // save multiple documents to the collection referenced by Book Model
      Item.collection.insertMany(itemData, function (err, docs) {
        if (err) {
          return console.error(err);
        } else {
          console.log("Multiple items inserted to Collection");
        }
      });
    });
  } catch (err) {
    console.log(err.stack);
  }
}

await seedDB();
