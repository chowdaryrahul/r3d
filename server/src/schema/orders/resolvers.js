import mongoose from "mongoose";
const Schema = mongoose.Schema;

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
  })
);

const resolvers = {
  Query: {
    getOrders: async (_, args) => {
      const Orders = await Order.find({});
      return Orders;
    },
    getOrder: async (_, args) => {
      const Order = await Order.findById({ _id: args._id });
      return Order;
    },
  },

  Mutation: {
    createOrder: async (_, args) => {
      let cardDate = {
        month: args.month,
        year: args.year,
      };
      let userPaymentinfo = {
        card_no: args.card_no,
        cvv: args.cvv,
        exp_date: cardDate,
      };
      let itemIds = {
        item_ids: args.item_ids,
      };
      let priceDetails = {
        total_price: args.total_price,
        tax: args.tax,
        shipping_cost: args.shipping_cost,
      };
      let address = {
        apartment: args.apartment,
        street: args.street,
        city: args.city,
        state: args.state,
        country: args.country,
        zipcode: args.zipcode,
      };
      let saveOrder = {
        item_ids: args.item_ids,
        estimated_delivery: args.estimated_delivery,
        address: address,
        user_id: args.user_id,
        price_details: priceDetails,
        payment_info: userPaymentinfo,
      };
      const newOrder = new Order(saveOrder);
      const createOrder = await newOrder.save();

      return createOrder;
    },
  },
};

export default resolvers;
