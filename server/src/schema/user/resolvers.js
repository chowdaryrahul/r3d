import mongoose from "mongoose";
import { GraphQLUpload } from "graphql-upload";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import gm from "gm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
let graphicMagick = gm.subClass({ imageMagick: true });

const Schema = mongoose.Schema;

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
    Upload: {
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

const resolvers = {
  Upload: GraphQLUpload,

  Query: {
    getUsers: async (_, args) => {
      const users = await User.find({});
      return users;
    },

    fetchUser: async (_, args) => {
      const user = await User.findById({ _id: args._id });
      return user;
    },
  },

  Mutation: {

    createUser: async (_, args) => {
      let saveUser = {
        _id: args._id,
        user_name: args.user_name,
        password: args.password,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
        about_me: args.about_me,
        profile_pic: "",
        cart_items: [],
        active_order_ids: [],
      };
      const newUser = new User(saveUser);
      const createdUser = await newUser.save();

      return createdUser;
    },

    addToCart: async (_, args) => {
      let flag = "";
      const addItemDetails = await User.findById({ _id: args._id });
      addItemDetails.cart_items.map((cartitem) => {
        if (cartitem.item_id == args.item_id) {
          flag = "itemInCart";
        }
      });

      if (flag === "itemInCart") {
        const addItemQuantity = await User.updateMany(
          { _id: args._id, "cart_items.item_id": args.item_id },
          { $set: { "cart_items.$.quantity": args.quantity } }
        );
      } else {
        let newCartObj = {
          item_id: args.item_id,
          quantity: args.quantity,
        };
        const newItem = await User.findOneAndUpdate(
          { _id: args._id },
          { $push: { cart_items: newCartObj } }
        );
      }

      return await User.findById({ _id: args._id });
    },

    removeFromCart: async (_, args) => {
      if (args.quantity > 0) {
        const reduceItem = await User.updateMany(
          { _id: args._id, "cart_items.item_id": args.item_id },
          { $set: { "cart_items.$.quantity": args.quantity } }
        );
      } else {
        let toRemoveCartItems = {};
        const removeItemDetails = await User.findById({ _id: args._id });
        removeItemDetails.cart_items.map((cartitem) => {
          if (cartitem.item_id == args.item_id) {
            toRemoveCartItems["item_id"] = args.item_id;
            toRemoveCartItems["quantity"] = cartitem.quantity;
          }
        });
        const removeItem = await User.findOneAndUpdate(
          { _id: args._id },
          { $pull: { cart_items: toRemoveCartItems } }
        );
      }
      return await User.findById({ _id: args._id });
    },

    afterPlaceOrder: async (_, args) => {
      const userDetails = await User.findById({ _id: args._id });
      let updatedOrderArr = [args.orderId];

      userDetails.active_order_ids.map((actOrdId) => {
        updatedOrderArr.push(actOrdId);
      });
      const addItemQuantity = await User.updateMany(
        { _id: args._id },
        { $set: { active_order_ids: updatedOrderArr, cart_items: [] } }
      );
      return await User.findById({ _id: args._id });
    },

    updateUser: async (_, args) => {
      // user_name: args.user_name,
      const userUpdated = await User.updateMany(
        { _id: args._id },
        {
          $set: {
            firstname: args.firstname,
            lastname: args.lastname,
            about_me: args.about_me,
          },
        }
      );
      return await User.findById({ _id: args._id });
    },

    detailsUpload: async function (_, args) {
      const { createReadStream, filename, encoding, mimetype } = await args.file;
      console.log(args)
      const stream = createReadStream();

      fs.mkdirSync(path.join(__dirname, "files"), { recursive: true });

      const output = fs.createWriteStream(
        path.join(__dirname, "files", `${Math.random(6)}_${filename}`)
      );
      console.log(output);
      const filePath = String(output.path).replace(/\\/g, "/");
      console.log(filePath);
      stream.pipe(output);
      var userUpdated;
      await new Promise(function (resolve, reject) {
        output.on("close", () => {
          console.log("File uploaded", filePath);
          const pathArray = filePath.split('/');
           console.log("Pathh=>",pathArray);
          // const pathArray = patharray.split('/');
          userUpdated = User.updateMany(
            { _id: args._id },
            {
              $set: {
                profile_pic: pathArray[pathArray.length - 1],
              },
            }
          );
          resolve();
        });

        output.on("error", (err) => {
          reject(err);
          throw new ApolloError(err)
        });
      });
      graphicMagick(filePath)
        .resize(300, 300)
        .write(filePath, function (err) {
          if (err) console.log(err);
        });
       if(userUpdated){
        return await User.findById({ _id: args._id });
      }
    },
  },
};
export default resolvers;
