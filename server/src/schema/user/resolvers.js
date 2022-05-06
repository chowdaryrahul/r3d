import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = mongoose.model(
  "User",

  new Schema({
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
    address: [
      new Schema(
        {
          apartment: { type: String, required: true },
          street: { type: String, required: true },
          city: { type: String, required: true },
          country: { type: String, required: true },
          zipcode: { type: Number, required: true },
        },
        { _id: false }
      ),
    ],

    item_ids: [
      new Schema({
        item_id: Schema.ObjectId,
      }),
    ],
    payment_info: [
      new Schema({
        card_no: { type: String, required: true },
        cvv: { type: Number, required: true },
        exp_date: new Schema({
          month: { type: Number, required: true },
          year: { type: Number, required: true },
        }),
      }),
    ],
    active_order_ids: [
      new Schema({
        item_id: Schema.ObjectId,
      }),
    ],
    cart_items: [
      new Schema({
        item_id: Schema.ObjectId,
      }),
    ],
  })
);

const resolvers = {
  Query: {
    getUsers: async (_, args) => {
      const Users = await User.find({});
      return Users;
    },
  },

  Mutation: {
    createUser: async (_, args) => {
      let userAddress = {
        apartment: args.apartment,
        street: args.street,
        city: args.city,
        country: args.country,
        zipcode: args.zipcode,
      };
      let itemId = [
        {
          item_id: args.item_id,
        },
      ];
      let userPaymentinfo = [
        { card_no: args.card_no, cvv: args.cvv, exp_date: cardDate },
      ];
      let cardDate = {
        month: args.month,
        year: args.year,
      };
      let saveUser = {
        user_name: args.user_name,
        password: args.password,
        email: args.email,
        firstname: args.firstname,
        lastname: args.lastname,
        about_me: args.about_me,
        address: userAddress,
        item_ids: itemId,
        payment_info: userPaymentinfo,
        active_order_ids: itemId,
        cart_items: itemId,
      };
      const newUser = new User(saveUser);
      const createdUser = await newUser.save();

      return createdUser;
    },
  },
};
export default resolvers;
